const { Model } = require('sequelize');

/* Defining the model for the brand table. */
module.exports = (sequelize, DataTypes) => {
    class LoginUserDataModel extends Model { }

    /* This is defining the columns of the table. */
    LoginUserDataModel.init(
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
            email: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            role: {
                type: DataTypes.STRING,
            },
            loginCount: {
                type: DataTypes.INTEGER,
            },
            loginTime: {
                type: DataTypes.DATE,
            },
            logoutTime: {
                type: DataTypes.DATE,
            },
            /* This is creating a timestamp for when the row was created and updated. */
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
            session_time: {
                type: DataTypes.INTEGER,
            }
        },
        {
            sequelize,
            modelName: 'LoginUserDataModel',
            tableName: 'login_user_data',
            underscored: true,
        },
    );

    return LoginUserDataModel;
};