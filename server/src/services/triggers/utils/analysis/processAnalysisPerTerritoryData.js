const { groupBy, keys, sumBy, first } = require('lodash');
const {
  TRIGGER_ANALYSIS_PER_TERRITORY_RANGE,
  TRIGGER_ANALYSIS_PER_TERRITORY_BIN_SIZE,
  TRIGGER_ANALYSIS_TYPE,
  PERCENT_MULTIPLIER,
} = require('../../../../constants/app.constant');
const db = require('../../../../models');
const {
  TrigrAnalysisPerTerritoryBreakdownModel,
  TrigrProdAnalysisPerTerritoryBreakdownModel,
  TrigrMetadataModel,
} = db;

/**
 * It takes in a territory name, a query object, and a type, and returns an array of objects containing
 * the trigger name, trigger type, number of suggestions, number of suggestions deployed, and capacity
 * contribution
 * @param territoryName - The name of the territory you want to get the data for.
 * @param analysisPerTerritoryBreakDownQueryParams - This is an object that contains the following
 * properties:
 * @param type - This is the type of trigger analysis you want to get. It can be either production or
 * non-production.
 * @returns An array of objects.
 */
const getAnalyticsPerTriggerBreakdownDataFromTerritoryName = async (
  territoryName,
  analysisPerTerritoryBreakDownQueryParams,
  type,
) => {
  const queryModel =
    type === TRIGGER_ANALYSIS_TYPE.production
      ? TrigrProdAnalysisPerTerritoryBreakdownModel
      : TrigrAnalysisPerTerritoryBreakdownModel;
  const whereClause = {
    ...analysisPerTerritoryBreakDownQueryParams,
    territory_name: territoryName,
  };
  const breakDownData = await queryModel.findAll({
    where: whereClause,
    include: [{ model: TrigrMetadataModel, required: true, raw: true }],
    raw: true,
  });
  return breakDownData.map(data => ({
    id: Number(data.id),
    triggerName: data.triggerName,
    triggerType: data['TrigrMetadataModel.isOnCycle'] ? 'On-Cycle' : 'Off-Cycle',
    numberOfSuggestions: Number(data.suggestions),
    numberOfSuggestionsDeployed: Number(data.suggestionsDeployed),
    capacityContribution: data.territoryCapacityContribution * PERCENT_MULTIPLIER,
  }));
};

/**
 * It takes a number and returns an object with a min and max properties.
 */
const getTerritoryRange = capacity => {
  const scaledCapacity = capacity * PERCENT_MULTIPLIER;
  const roundedOffCapacity = Math.round(scaledCapacity);
  // capacity is below the min limit < 80
  if (roundedOffCapacity < TRIGGER_ANALYSIS_PER_TERRITORY_RANGE.min) {
    return {
      min: 0,
      max: TRIGGER_ANALYSIS_PER_TERRITORY_RANGE.min,
      label: `< ${TRIGGER_ANALYSIS_PER_TERRITORY_RANGE.min}`,
    };
  }
  // capacity is greater than equal the max limit >=150
  else if (roundedOffCapacity >= TRIGGER_ANALYSIS_PER_TERRITORY_RANGE.max) {
    return {
      min: TRIGGER_ANALYSIS_PER_TERRITORY_RANGE.max,
      max: TRIGGER_ANALYSIS_PER_TERRITORY_RANGE.max,
      label: `≥ ${TRIGGER_ANALYSIS_PER_TERRITORY_RANGE.max}`,
    };
  } else {
    /* 
    capacity is b/w 80(inclusive) and 150(exclusive)
    get min multiple of bin size that is less than or equal to the scaled capacity
  */
    const rangeMin =
      Math.floor(roundedOffCapacity / TRIGGER_ANALYSIS_PER_TERRITORY_BIN_SIZE) *
      TRIGGER_ANALYSIS_PER_TERRITORY_BIN_SIZE;
    const rangeMax = rangeMin + TRIGGER_ANALYSIS_PER_TERRITORY_BIN_SIZE - 1;
    return {
      min: rangeMin,
      max: rangeMax,
      label: `${rangeMin}-${rangeMax}`,
    };
  }
};

/**
 * It takes in an array of objects, each object containing a territory name, and a bunch of capacity numbers
 * @param territoriesPerBin - This is an array of objects that contain the territory name, capacity, depCapacity,
 * onCycleCapacity, and offCycleCapacity.
 * @param analysisPerTerritoryBreakDownQueryParams - base where clause passed from service method.
 * @param type - 'territory' or 'trigger'
 * @returns An array of objects.
 */
const getBreakdownSummary = async (
  territoriesPerBin,
  analysisPerTerritoryBreakDownQueryParams,
  type,
) => {
  return Promise.all(
    territoriesPerBin.map(async territory => {
      const triggersData = await getAnalyticsPerTriggerBreakdownDataFromTerritoryName(
        territory.territoryName,
        analysisPerTerritoryBreakDownQueryParams,
        type,
      );
      return {
        territoryName: territory.territoryName,
        capacity: Math.round(territory.capacity * PERCENT_MULTIPLIER),
        depCapacity: territory.depCapacity * PERCENT_MULTIPLIER,
        onCycleCapacity: territory.onCycleCapacity * PERCENT_MULTIPLIER,
        offCycleCapacity: territory.offCycleCapacity * PERCENT_MULTIPLIER,
        triggersData,
      };
    }),
  );
};

/**
 * It takes an array of objects and returns an object with the average of each property.
 * @param breakdownSummary - an array of objects, each object representing a territory
 * @param numberOfTerritories - The number of territories in the territory plan.
 * @returns An object with the average capacity, average depCapacity, average onCycleCapacity, and average
 * offCycleCapacity.
 */
const getAggregateSummary = (breakdownSummary, numberOfTerritories) => {
  return {
    averageCapacity: sumBy(breakdownSummary, 'capacity') / numberOfTerritories,
    averageDepCapacity: sumBy(breakdownSummary, 'depCapacity') / numberOfTerritories,
    averageOnCycleCapacity: sumBy(breakdownSummary, 'onCycleCapacity') / numberOfTerritories,
    averageOffCycleCapacity: sumBy(breakdownSummary, 'offCycleCapacity') / numberOfTerritories,
  };
};

/**
 * It takes a list of territories, and returns a summary of the analysis for those territories
 * @param territoriesPerBin - an array of territories that fall within a certain capacity utilization range
 * @param label - The label for the bin.
 * @param analysisPerTerritoryBreakDownQueryParams - This is the query parameters that will be used to get the breakdown
 * summary for each territory.
 * @param type - 'simulation' or 'production'
 * @returns An object with the following properties:
 *   numberOfTerritories: number
 *   capacityUtilization: number
 *   label: string
 *   aggregateSummary: object
 *   averageCapacityContributionRange: object
 *   breakdownSummary: object
 */
const processTerritoriesPerBin = async (
  territoriesPerBin,
  label,
  analysisPerTerritoryBreakDownQueryParams,
  type,
) => {
  const numberOfTerritories = territoriesPerBin.length;
  const breakdownSummary = await getBreakdownSummary(
    territoriesPerBin,
    analysisPerTerritoryBreakDownQueryParams,
    type,
  );
  const aggregateSummary = getAggregateSummary(breakdownSummary, numberOfTerritories);
  // Within a range, all the triggers would have same min and max, thus first territory is used to determine the values
  const firstTerritory = first(territoriesPerBin);
  const averageCapacityContributionRange = {
    min: firstTerritory.min,
    max: firstTerritory.max,
  };
  const capacityUtilization = averageCapacityContributionRange.max;
  return {
    numberOfTerritories,
    capacityUtilization,
    label,
    aggregateSummary,
    averageCapacityContributionRange,
    breakdownSummary,
  };
};

/**
 * It takes in an array of objects, groups them by a key, and then processes each group of objects
 * @param triggerAnalysisPerTerritoryData - This is the territories data we get from the DB.
 * @param analysisPerTerritoryBreakDownQueryParams - This is the query parameters that will be used to get the breakdown of
 * the analysis per territory.
 * @param type - 'territory'
 * @returns An array of objects.
 */
const processTerritoryAnalysis = async (
  triggerAnalysisPerTerritoryData,
  analysisPerTerritoryBreakDownQueryParams,
  type,
) => {
  // 1. Calculate the bin ranges the territory should belong to
  const territoryAnalysisWithBinRange = triggerAnalysisPerTerritoryData.map(territory => ({
    ...territory,
    ...getTerritoryRange(territory.capacity),
  }));
  // 2. Group the territories based on the range calculated in the previous step
  const territoryAnalysisGroupedByLabel = groupBy(territoryAnalysisWithBinRange, 'label');
  const labelKeys = keys(territoryAnalysisGroupedByLabel);
  return Promise.all(
    labelKeys.map(async labelKey =>
      // 3. Calculate the summary data for each range
      processTerritoriesPerBin(
        territoryAnalysisGroupedByLabel[labelKey],
        labelKey,
        analysisPerTerritoryBreakDownQueryParams,
        type,
      ),
    ),
  );
};

module.exports = {
  processTerritoryAnalysis,
};
