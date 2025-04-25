const { Model } = require('sequelize');

/* Defining the model for the trigger_metadata table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class TrigrSimMetadataModel extends Model {
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

  TrigrSimMetadataModel.init(
    {
      /* This is creating a unique id for each row in the table. */
      id: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      triggerName: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      brand: {
        type: DataTypes.STRING,
      },
      sellingDivision: {
        type: DataTypes.STRING,
      },
      owner: {
        type: DataTypes.STRING,
      },
      /* Column to store tags. */
      tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      /* Column to store channels. */
      channels: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      volume: {
        type: DataTypes.BIGINT,
      },
      orphanCount: {
        type: DataTypes.INTEGER,
      },
      PostVolume: {
        type: DataTypes.BIGINT,
        column: 'post_volume',
      },
      /* Column to store capacity contribution. */
      capacityContribution: {
        type: DataTypes.FLOAT,
      },
      /* Column to store is OnCycle state. */
      isOnCycle: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      /* Column to store is Active state. */
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      /* Column to store delivery frequency. */
      deliveryFrequency: {
        type: DataTypes.STRING,
      },
      typeOfTrigger: {
        type: DataTypes.STRING,
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
      modelName: 'TrigrSimMetadataModel',
      tableName: 'trigr_sim_metadata',
      underscored: true,
    },
  );

  return TrigrSimMetadataModel;
};
