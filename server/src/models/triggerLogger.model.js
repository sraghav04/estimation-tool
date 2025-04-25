const { Model } = require('sequelize');

/* Defining the model for the brand table. */
module.exports = (sequelize, DataTypes) => {
  class TriggerLoggerModel extends Model {}

  /* This is defining the columns of the table. */
  TriggerLoggerModel.init(
    {
      /* This is creating a unique id for each row in the table. */
      id: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      brand: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      owner: {
        type: DataTypes.STRING,
      },
      disabledTriggers: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      enabledTriggers: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
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
      modelName: 'TriggerLoggerModel',
      tableName: 'trigr_enable_logger',
      underscored: true,
    },
  );

  return TriggerLoggerModel;
};
