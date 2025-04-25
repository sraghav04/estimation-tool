const { Model } = require('sequelize');

/* Defining the model for the trigger_prod_overview table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class TrigrProdOverviewModel extends Model {
    static associate(models) {
      this.belongsTo(models.BrandSellingDivisionModel, {
        foreignKey: 'brand',
        targetKey: 'brand',
      });
      this.belongsTo(models.BrandSellingDivisionModel, {
        foreignKey: 'sellingDivision',
        targetKey: 'sellingDivision',
      });
    }
  }

  TrigrProdOverviewModel.init(
    {
      /* This is creating a unique id for each row in the table. */
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
      },
      brand: {
        type: DataTypes.STRING,
      },
      sellingDivision: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: DataTypes.DATE,
      },
      currEndDate: {
        type: DataTypes.DATE,
      },
      currStartDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
      },
      /* Column to store depCapacity. */ 
      depCapacity: {
        type: DataTypes.FLOAT,
      },
      /* Column to store onCycleCapacity. */
      onCycleCapacity: {
        type: DataTypes.FLOAT,
      },
      /* Column to store offCycleCapacity. */
      offCycleCapacity: {
        type: DataTypes.FLOAT,
      },
      /* Column to store onCycleTriggerSuggestionClosed. */
      onCycleTriggerSuggestionClosed: {
        type: DataTypes.FLOAT,
      },
      /* Column to store offCycleTriggerSuggestionClosed. */
      offCycleTriggerSuggestionClosed: {
        type: DataTypes.FLOAT,
      },
      /* This is creating a timestamp for when the row was created and updated. */
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'TrigrProdOverviewModel',
      tableName: 'trigr_prod_overview',
      underscored: true,
    },
  );

  return TrigrProdOverviewModel;
};
