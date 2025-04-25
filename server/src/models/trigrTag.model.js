const { Model } = require('sequelize');

/* Defining the model for the trigger_tag table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class TrigrTagModel extends Model {}

  TrigrTagModel.init(
    {
      /* This is creating a unique id for each row in the table. */
      id: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      tagName: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      lastUsedAt: {
        type: DataTypes.DATE,
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
      modelName: 'TrigrTagModel',
      tableName: 'trigr_tag',
      underscored: true,
    },
  );

  return TrigrTagModel;
};
