const { Model } = require('sequelize');


/* Defining the model for the user feedback table. */
module.exports = (sequelize, DataTypes) => {
    /* This is defining the columns of the table. */
    class PublishDataModel extends Model { }

    PublishDataModel.init(
        {
            /* This is creating a unique id for each row in the table. */
            id: {
                type: DataTypes.INTEGER,
                unique: true,
            },
            fileName: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            cycle: {
                type: DataTypes.STRING,
            },
            /* Column to store brand. */
            brand: {
                type: DataTypes.STRING,
            },
            /* Column to store sellingDivision. */
            sellingDivision: {
                type: DataTypes.STRING,

            },
            publishDate: {
                type: DataTypes.STRING,
            },
            /* Column to store publish status. */
            publishStatus: {
                type: DataTypes.STRING,

            },
            downstream: {
                type: DataTypes.STRING,

            },
        },
        {
            sequelize,
            modelName: 'PublishDataModel',
            tableName: 'trigr_publish_metadata',
            underscored: true,
        },
    );

    return PublishDataModel;
};
