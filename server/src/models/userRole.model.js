const { Model } = require('sequelize');

/* Defining the model for the brand table. */
module.exports = (sequelize, DataTypes) => {
  class UserRoleModel extends Model {}

  /* This is defining the columns of the table. */
  UserRoleModel.init(
    {
      /* This is creating a unique id for each row in the table. */
      id: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      userName: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      emailId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
      },
      /* This is creating a timestamp for when the row was created and updated. */
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      brand: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      copyEmailId: {
        type: DataTypes.TEXT,
      },
      region: {
        type: DataTypes.STRING,
      },
      district: {
        type: DataTypes.STRING,
      },
      accessStatus: {
        type: DataTypes.BOOLEAN,
    },
      isDeleted: {
        type: DataTypes.BOOLEAN,
    },
    entryFrom: {
        type: DataTypes.STRING,
      },
      expirationDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'UserRoleModel',
      tableName: 'user_roles',
      underscored: true,
    },
  );

  return UserRoleModel;
};
