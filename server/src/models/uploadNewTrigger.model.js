const { Model } = require('sequelize');


/* Defining the model for the user feedback table. */
module.exports = (sequelize, DataTypes) => {
    /* This is defining the columns of the table. */
    class UploadNewTriggerModel extends Model { }

    UploadNewTriggerModel.init(
        {
            /* This is creating a unique id for each row in the table. */
            id: {
                type: DataTypes.INTEGER,
                unique: true,
            },
            brand: {
                type: DataTypes.STRING,
              },
              sellingDivision: {
                type: DataTypes.STRING,
              },
            fileName: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            volume: {
                type: DataTypes.NUMBER,
            },
            /* Column to store owner. */
            owner: {
                type: DataTypes.STRING,
            },
            /* Column to store uploadStatus. */
            uploadStatus: {
                type: DataTypes.STRING,

            },
            isPublished: {
                type: DataTypes.BOOLEAN,
            },
            /* Column to store upload type. */
            uploadType: {
                type: DataTypes.STRING,

            },
            triggerName: {
                type: DataTypes.STRING,

            },
            readFlag: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize,
            modelName: 'UploadNewTriggerModel',
            tableName: 'trigr_upload_file_metadata',
            underscored: true,
        },
    );

    return UploadNewTriggerModel;
};
