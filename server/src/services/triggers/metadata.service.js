const { get, omit, map } = require('lodash');
const Sequelize = require('sequelize');
const logger = require('../../config/logger.config');
const { DEFAULT_PAGE_SIZE } = require('../../constants/app.constant');
const { getConditionalQueryClause } = require('./utils/metadata/conditionalQuery.util');

class MetadataService {
  constructor(db) {
    const { TrigrMetadataModel, TrigrSimMetadataModel, BrandSellingDivisionModel, TrigrTagModel } = db;
    this.metadataModel = TrigrMetadataModel;
    this.simMetadataModel = TrigrSimMetadataModel;
    this.brandSellingDivisionModel = BrandSellingDivisionModel;
    this.tagModel = TrigrTagModel;
    this.db = db;
  }

  /**
   * It returns a list of metadata objects, each of which contains a list of brandSellingDivision
   * objects
   * @param reqQueryString - This is the query string that is passed in the request.
   * @param [triggerNamesWhereClause] - This is an object that contains the trigger names that you want
   * to query.
   */
  async getMetadata(reqQueryString, triggerNamesWhereClause = {}) {
    const transactionLock = await this.db.sequelize.transaction();
    try {
      const page = get(reqQueryString, 'page', 1);
      const pageSize = get(reqQueryString, 'pageSize', DEFAULT_PAGE_SIZE);
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const whereClause = getConditionalQueryClause(reqQueryString, Sequelize.Op, Sequelize);
      const queryClause = {
        attributes: [
          'id',
          'triggerName',
          'description',
          'owner',
          'tags',
          'channels',
          'volume',
          'orphanCount',
          'PostVolume',
          'isOnCycle',
          'isActive',
          'brand',
          'sellingDivision',
          'typeOfTrigger',
          'capacityContribution',
          'deliveryFrequency',
        ],
        where: {
          ...triggerNamesWhereClause,
          ...whereClause,
          // [Sequelize.Op.and]: [
          //   {
          //     typeOfTrigger: {
          //       [Sequelize.Op.ne]: 'IDN',
          //     },
          //   },
          //   {
          //     volume: {
          //       [Sequelize.Op.ne]: 0,
          //     },
          //   },
          // ],        
        },
        offset,
        limit,
        raw: true,
        order: [['volume', 'DESC NULLS LAST']],
      };

      const metadata = await this.metadataModel.findAll({
        ...queryClause,
        include: [
          {
            model: this.brandSellingDivisionModel,
            attributes: ['tenure'],
          },
        ],
        transaction: transactionLock,
      });
      
      const payload = this.mapMetadata(this.removeDuplicates(metadata,'id'));

      const totalCount = await this.metadataModel.count({
        where: {
          ...triggerNamesWhereClause,
          ...whereClause,
        },
        transaction: transactionLock,
      });

      await transactionLock.commit();

      return {
        totalCount: totalCount,
        payload: payload,
        page,
        pageSize,
      };
    } catch (e) {
      await transactionLock.rollback();
      logger.error('getMetadata Error:', e);
      throw e;
    }
  }

  async getSimMetadata(reqQueryString, triggerNamesWhereClause = {}) {
    const transactionLock = await this.db.sequelize.transaction();
    try {
      const page = get(reqQueryString, 'page', 1);
      const pageSize = get(reqQueryString, 'pageSize', DEFAULT_PAGE_SIZE);
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const whereClause = getConditionalQueryClause(reqQueryString, Sequelize.Op, Sequelize);
      const queryClause = {
        attributes: [
          'id',
          'triggerName',
          'description',
          'owner',
          'tags',
          'channels',
          'volume',
          'orphanCount',
          'typeOfTrigger',
          'PostVolume',
          'isOnCycle',
          'isActive',
          'brand',
          'sellingDivision',
          'capacityContribution',
          'deliveryFrequency',
        ],
        where: {
          ...triggerNamesWhereClause,
          ...whereClause,
          // [Sequelize.Op.and]: [
          //   {
          //     typeOfTrigger: {
          //       [Sequelize.Op.ne]: 'IDN',
          //     },
          //   },
          //   {
          //     volume: {
          //       [Sequelize.Op.ne]: 0,
          //     },
          //   },
          // ], 
        },
        offset,
        limit,
        raw: true,
        order: [['volume', 'DESC NULLS LAST']],
      };

      const metadata = await this.simMetadataModel.findAll({
        ...queryClause,
        include: [
          {
            model: this.brandSellingDivisionModel,
            attributes: ['currTenure'],
          },
        ],
        transaction: transactionLock,
      });

      const payload = this.mapSimMetadata(this.removeDuplicates(metadata,'id'));

      const totalCount = await this.simMetadataModel.count({
        where: {
          ...triggerNamesWhereClause,
          ...whereClause,
        },
        transaction: transactionLock,
      });

      await transactionLock.commit();

      return {
        totalCount: totalCount,
        payload: payload,
        page,
        pageSize,
      };
    } catch (e) {
      await transactionLock.rollback();
      logger.error('getMetadata Error:', e);
      throw e;
    }
  }

  /**
   * It takes an array of trigger metadata objects, fetches the tags from the input, upserts the tags
   * in the database, updates the trigger metadata in the database and returns the updated trigger
   * metadata objects
   * @param triggerRequests - An array of objects containing the trigger metadata to be updated.
   * @returns An array of promises, one for each tag's update
   */
  async patchMetadata(triggerRequests) {
    const transactionLock = await this.db.sequelize.transaction();
    try {
      // fetching tags from input and storing in array
      const triggersTagsList = map(triggerRequests, 'tags');
      // converting 2-d array of tags into 1-d array
      const tagsList = [...new Set(triggersTagsList.flat())];
      // loop over the created tagsList and return an array of promises, one for each tag's update
      const upsertTagsPromise = tagsList.map(tag => {
        return this.tagModel.upsert(
          {
            tagName: tag,
            lastUsedAt: Date.now(),
          },
          {
            transaction: transactionLock,
          },
        );
      });
      // loop over the inputs and return an array of promises, one for each update
      const updateTriggerMetadataPromise = triggerRequests.map(triggerRequest => {
        const { tags, description, id, onCycle, deliveryFrequency, owner } = triggerRequest;
        return this.simMetadataModel.update(
          { tags, description, deliveryFrequency, isOnCycle: onCycle, owner },
          {
            where: { id },
            returning: true,
            raw: true,
            transaction: transactionLock,
          },
        );
      });
      // resolve all the db calls at once
      await Promise.all(upsertTagsPromise);
      const triggerMetadataQueryResponses = await Promise.all(updateTriggerMetadataPromise);
      const triggerMetadataList = triggerMetadataQueryResponses.reduce(
        (triggerMetadataAccumulator, triggerMetadataQueryResponse) => {
          if (triggerMetadataQueryResponse.length > 0 && triggerMetadataQueryResponse[0] != 0) {
            return [...triggerMetadataAccumulator, ...triggerMetadataQueryResponse[1]];
          }
          return triggerMetadataAccumulator;
        },
        [],
      );
      await transactionLock.commit();
      return this.mapMetadata(triggerMetadataList);
    } catch (e) {
      await transactionLock.rollback();
      logger.error('patchMetadata Error:', e);
      throw e;
    }
  }

  /**
   * It takes a list of trigger metadata objects and returns a list of trigger metadata objects with
   * the `createdAt`, `updatedAt`, and `BrandSellingDivisionModel.tenure` properties removed
   * @param triggerMetadataList - The list of triggers that you want to map.
   * @returns An array of objects with the following properties:
   *   - id
   *   - name
   *   - description
   *   - BrandSellingDivisionModel.tenure
   *   - BrandSellingDivisionModel.id
   *   - BrandSellingDivisionModel.name
   *   - BrandSellingDivisionModel.description
   *   - BrandSellingDivisionModel.createdAt
   */
  mapMetadata(triggerMetadataList) {
    return triggerMetadataList.map(trigger => {
      return {
        ...omit(trigger, ['createdAt', 'updatedAt', 'BrandSellingDivisionModel.tenure']),
        tenure: get(trigger, 'BrandSellingDivisionModel.tenure', null),
      };
    });
  }

  mapSimMetadata(triggerSimMetadataList) {
    return triggerSimMetadataList.map(trigger => {
      return {
        ...omit(trigger, ['createdAt', 'updatedAt', 'BrandSellingDivisionModel.currTenure']),
        tenure: get(trigger, 'BrandSellingDivisionModel.currTenure', null),
      };
    });
  }
   removeDuplicates(array, property) {
    const uniqueMap = new Map();
    const result = [];
  
    for (const item of array) {
      if (!uniqueMap.has(item[property])) {
        uniqueMap.set(item[property], true);
        result.push(item);
      }
    }
  
    return result;
  }
}

module.exports = MetadataService;
