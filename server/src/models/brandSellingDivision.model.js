const { Model } = require('sequelize');

/* Defining the model for the brand_selling_division table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class BrandSellingDivisionModel extends Model {
    static associate(models) {
      this.belongsTo(models.BrandModel, {
        foreignKey: 'brand',
        targetKey: 'brand',
      });
    }
  }

  BrandSellingDivisionModel.init(
    {
      /* This is creating a unique id for each row in the table. */
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      brand: {
        type: DataTypes.STRING,
      },
      sellingDivision: {
        type: DataTypes.STRING,
      },
      totalCallsPrev: {
        type: DataTypes.INTEGER,
      },
      totalCallsCurr: {
        type: DataTypes.INTEGER,
      },
      tenure: {
        type: DataTypes.STRING,
      },
      indication: {
        type: DataTypes.STRING,
      },
      /* Column to store threshold capacity. */
      thresholdCapacityMax: {
        type: DataTypes.FLOAT,
        column: 'threshold_capacity_max',
      },
      /* Column to store min calls. */
      minCalls: {
        type: DataTypes.INTEGER,
      },
      /* Column to store max calls. */
      maxCalls: {
        type: DataTypes.INTEGER,
      },
      /* Column to store on cycle trigger capacity. */
      onCycleTriggerCapacity: {
        type: DataTypes.FLOAT,
      },
      /* This is creating a timestamp for when the row was created and updated. */
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      thresholdCapacityMin: {
        type: DataTypes.FLOAT,
        column: 'threshold_capacity_min',
      },
      currTenure: {
        type: DataTypes.STRING,
      },
      viewType: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'BrandSellingDivisionModel',
      tableName: 'brand_selling_division',
      underscored: true,
    },
  );

  return BrandSellingDivisionModel;
};
