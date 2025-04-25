const { Model } = require('sequelize');

/* Defining the model for the trigger_analysis_per_trigger table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class TrigrAnalysisPerTrigrModel extends Model {
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

  TrigrAnalysisPerTrigrModel.init(
    {
      /* This is creating a unique id for each row in the table. */
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      triggerName: {
        type: DataTypes.STRING,
      },
      simulationId: {
        type: DataTypes.INTEGER,
      },
      /* Column to store number of territories. */
      numberOfTerritories: {
        type: DataTypes.INTEGER,
      },
      /* Column to store average contribution. */
      averageContribution: {
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
      modelName: 'TrigrAnalysisPerTrigrModel',
      tableName: 'trigr_analysis_per_trigr',
      underscored: true,
    },
  );

  return TrigrAnalysisPerTrigrModel;
};
