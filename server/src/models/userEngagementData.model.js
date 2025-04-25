const { Model } = require('sequelize');

/* Defining the model for the brand table. */
module.exports = (sequelize, DataTypes) => {
    /* This is defining the columns of the table. */
    class UserEngagementDataModel extends Model { }

    UserEngagementDataModel.init(
        {
            /* This is creating a unique id for each row in the table. */
            id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
            },
            owner: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            upload: {
                type: DataTypes.JSON,
                allowNull: true,

            },
            reconfigure: {
                type: DataTypes.JSON,
                allowNull: true,

            },
            simulate: {
                type: DataTypes.JSON,
                allowNull: true,

            },
            publish: {
                type: DataTypes.JSON,
                allowNull: true,

            },
            repSimulate: {
                type: DataTypes.JSON,
                allowNull: true,

            },
            bulkSuppression: {
                type: DataTypes.JSON,
                allowNull: true,

            },
            bulkRecover: {
                type: DataTypes.JSON,
                allowNull: true,

            },
            module: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            brand: {
                type: DataTypes.STRING
            },
            startDate: {
                type: DataTypes.STRING
            },
            endDate: {
                type: DataTypes.STRING
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
            modelName: 'UserEngagementDataModel',
            tableName: 'user_engagement_status',
            underscored: true,
        },
    );

    return UserEngagementDataModel;
};
