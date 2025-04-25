const { Model } = require('sequelize');

/* Defining the model for the brand table. */
module.exports = (sequelize, DataTypes) => {
    /* This is defining the columns of the table. */
    class BrandModuletDataModel extends Model { }

    BrandModuletDataModel.init(
        {
            /* This is creating a unique id for each row in the table. */
            id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            module: {
                type: DataTypes.STRING,
                allowNull: true,

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
            modelName: 'BrandModuletRelationalDataModel',
            tableName: 'brand_module_data',
            underscored: true,
        },
    );

    return BrandModuletDataModel;
};
