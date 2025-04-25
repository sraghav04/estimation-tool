const { Model } = require('sequelize');

/* Defining the model for the trigger_sim_config table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class TrigrSimConfigModel extends Model {
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

  TrigrSimConfigModel.init(
    {
      /* This is creating a unique id for each row in the table. */
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      brand: {
        type: DataTypes.STRING,
      },
      sellingDivision: {
        type: DataTypes.STRING,
      },
      /* Column to store status. */
      status: {
        type: DataTypes.ENUM('Requested', 'In_Progress', 'Failed', 'Success', 'Cancelled'),
      },
      /* Column to store onCycleTriggerCapacity. */
      onCycleTriggerCapacity: {
        type: DataTypes.FLOAT,
      },
      /* Column to store onCycleActiveTriggers. */
      onCycleActiveTriggers: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      /* Column to store offCycleActiveTriggers. */
      offCycleActiveTriggers: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      /* Column to flag between reconfigure and simulation */
      isPublished: {
        type: DataTypes.BOOLEAN,
      },
      /* Column to flag between reconfigured and not reconfigured simulation */
      isReconfigured: {
        type: DataTypes.BOOLEAN,
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
      modelName: 'TrigrSimConfigModel',
      tableName: 'trigr_sim_config',
      underscored: true,
    },
  );

  return TrigrSimConfigModel;
};
