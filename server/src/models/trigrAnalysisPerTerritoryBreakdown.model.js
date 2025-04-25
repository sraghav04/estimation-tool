const { Model } = require('sequelize');

/* Defining the model for the trigger_analysis_per_territory_breakdown table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class TrigrAnalysisPerTerritoryBreakdownModel extends Model {
    static associate(models) {
      this.belongsTo(models.TrigrSimConfigModel, {
        foreignKey: 'simulationId',
        targetKey: 'id',
      });
      this.belongsTo(models.TrigrMetadataModel, {
        foreignKey: 'triggerName',
        targetKey: 'triggerName',
      });
    }
  }

  TrigrAnalysisPerTerritoryBreakdownModel.init(
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
      simulationId: {
        type: DataTypes.INTEGER,
      },
      /* Column to store suggestions. */
      suggestions: {
        type: DataTypes.INTEGER,
      },
      /* Column to store territory capacity contribution. */
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
      modelName: 'TrigrAnalysisPerTerritoryBreakdownModel',
      tableName: 'trigr_analysis_per_territory_breakdown',
      underscored: true,
    },
  );

  return TrigrAnalysisPerTerritoryBreakdownModel;
};
