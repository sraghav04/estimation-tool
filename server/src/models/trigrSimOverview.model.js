const { Model } = require('sequelize');

/* Defining the model for the trigger_sim_overview table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class TrigrSimOverviewModel extends Model {
    static associate(models) {
      this.belongsTo(models.TrigrProdOverviewModel, {
        foreignKey: 'simulation_id',
        targetKey: 'id',
      });
    }
  }

  TrigrSimOverviewModel.init(
    {
      /* This is creating a unique id for each row in the table. */
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      simulationId: {
        type: DataTypes.INTEGER,
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
      modelName: 'TrigrSimOverviewModel',
      tableName: 'trigr_sim_overview',
      underscored: true,
    },
  );

  return TrigrSimOverviewModel;
};
