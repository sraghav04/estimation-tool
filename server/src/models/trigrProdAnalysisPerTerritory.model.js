const { Model } = require('sequelize');

/* Defining the model for the prod_trigger_analysis_per_territory table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class TrigrProdAnalysisPerTerritoryModel extends Model {
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

  TrigrProdAnalysisPerTerritoryModel.init(
    {
      /* This is creating a unique id for each row in the table. */
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      territoryName: {
        type: DataTypes.STRING,
      },
      brand: {
        type: DataTypes.STRING,
      },
      sellingDivision: {
        type: DataTypes.STRING,
      },
      /* Column to store capacity. */
      capacity: {
        type: DataTypes.FLOAT,
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
      modelName: 'TrigrProdAnalysisPerTerritoryModel',
      tableName: 'trigr_prod_analysis_per_territory',
      underscored: true,
    },
  );

  return TrigrProdAnalysisPerTerritoryModel;
};
