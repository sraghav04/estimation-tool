const { Model } = require('sequelize');

/* Defining the model for the prod_trigger_analysis_per_territory_breakdown table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class TrigrProdAnalysisPerTerritoryBreakdownModel extends Model {
    static associate(models) {
      this.belongsTo(models.BrandSellingDivisionModel, {
        foreignKey: 'brand',
        targetKey: 'brand',
      });
      this.belongsTo(models.BrandSellingDivisionModel, {
        foreignKey: 'sellingDivision',
        targetKey: 'sellingDivision',
      });
      this.belongsTo(models.TrigrMetadataModel, {
        foreignKey: 'triggerName',
        targetKey: 'triggerName',
      });
    }
  }

  TrigrProdAnalysisPerTerritoryBreakdownModel.init(
    {
      /* This is creating a unique id for each row in the table. */
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      territoryName: {
        type: DataTypes.STRING,
      },
      triggerName: {
        type: DataTypes.STRING,
      },
      brand: {
        type: DataTypes.STRING,
      },
      /* Column to store selling Division. */
      sellingDivision: {
        type: DataTypes.STRING,
      },
      /* Column to store suggestions. */
      suggestions: {
        type: DataTypes.INTEGER,
      },
      /* Column to store suggestionsDeployed. */
      suggestionsDeployed: {
        type: DataTypes.INTEGER,
      },
      /* Column to store territoryCapacityContribution. */
      territoryCapacityContribution: {
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
      modelName: 'TrigrProdAnalysisPerTerritoryBreakdownModel',
      tableName: 'trigr_prod_analysis_per_territory_breakdown',
      underscored: true,
    },
  );

  return TrigrProdAnalysisPerTerritoryBreakdownModel;
};
