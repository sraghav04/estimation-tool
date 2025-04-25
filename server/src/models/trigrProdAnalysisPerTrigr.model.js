const { Model } = require('sequelize');

/* Defining the model for the prod_trigger_analysis_per_trigger table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class TrigrProdAnalysisPerTrigrModel extends Model {
    static associate(models) {
      this.belongsTo(models.BrandSellingDivisionModel, {
        foreignKey: 'brand',
        targetKey: 'brand',
      });
      this.belongsTo(models.BrandSellingDivisionModel, {
        foreignKey: 'sellingDivision',
        targetKey: 'sellingDivision',
      });
      this.belongsTo(models.TrigrMetadataModel, {
        foreignKey: 'triggerName',
        targetKey: 'triggerName',
      });
    }
  }

  TrigrProdAnalysisPerTrigrModel.init(
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
      brand: {
        type: DataTypes.STRING,
      },
      sellingDivision: {
        type: DataTypes.STRING,
      },
      /* Column to store numberOfTerritories. */
      numberOfTerritories: {
        type: DataTypes.INTEGER,
      },
      /* Column to store averageContribution. */
      averageContribution: {
        type: DataTypes.FLOAT,
      },
      /* Column to store suggestionsClosed. */
      suggestionsClosed: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
      modelName: 'TrigrProdAnalysisPerTrigrModel',
      tableName: 'trigr_prod_analysis_per_trigr',
      underscored: true,
    },
  );

  return TrigrProdAnalysisPerTrigrModel;
};
