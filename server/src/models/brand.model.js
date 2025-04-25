const { Model } = require('sequelize');

/* Defining the model for the brand table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class BrandModel extends Model {}

  BrandModel.init(
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
      modelName: 'BrandModel',
      tableName: 'brand',
      underscored: true,
    },
  );

  return BrandModel;
};
