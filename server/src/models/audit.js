'use strict';
const { Model } = require('sequelize');
/* Defining the model for the audit table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class Audit extends Model {
    static getAllAuditInfo() {
      return Audit.findAll();
    }
  }
  Audit.init(
    /* This is creating a username column in the table. */
    {
      username: DataTypes.STRING,
      action: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'audit',
      freezeTableName: true,
    },
  );
  return Audit;
};
