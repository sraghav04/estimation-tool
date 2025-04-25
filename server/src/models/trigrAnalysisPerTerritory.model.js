const { Model } = require('sequelize');

/* Defining the model for the trigger_analysis_per_territory table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class TrigrAnalysisPerTerritoryModel extends Model {
    static associate(models) {
      this.belongsTo(models.TrigrSimConfigModel, {
        foreignKey: 'simulationId',
        targetKey: 'id',
      });
    }
  }

  TrigrAnalysisPerTerritoryModel.init(
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
      /* Simulation config identifier */
      simulationId: {
        type: DataTypes.INTEGER,
      },
      /* Columns defining various capacities. */
      capacity: {
        type: DataTypes.FLOAT,
      },
      depCapacity: {
        type: DataTypes.FLOAT,
      },
      onCycleCapacity: {
        type: DataTypes.FLOAT,
      },
      offCycleCapacity: {
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
      modelName: 'TrigrAnalysisPerTerritoryModel',
      tableName: 'trigr_analysis_per_territory',
      underscored: true,
    },
  );

  return TrigrAnalysisPerTerritoryModel;
};
