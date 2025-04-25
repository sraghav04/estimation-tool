const { Model } = require('sequelize');


/* Defining the model for the user access table. */
module.exports = (sequelize, DataTypes) => {
    /* This is defining the columns of the table. */
    class UserAccessDataModel extends Model { }

    UserAccessDataModel.init(
        {
            /* This is creating a unique id for each row in the table. */
            id: {
                type: DataTypes.INTEGER,
                unique: true,
            },
            /* Column to store name. */
            name: {
                type: DataTypes.STRING,
            },
            /* Column to store emailId. */
            emailId: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            /* Column to store role. */
            role: {
                type: DataTypes.STRING,
            },
            brand: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
            },
            /* Column to store module. */
            module: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
            },
            /* Column to store region. */
            region: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
            },
            /* Column to store accessStatus. */
            accessStatus: {
                type: DataTypes.BOOLEAN,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize,
            modelName: 'UserAccessDataModel',
            tableName: 'admin_user_access',
            underscored: true,
        },
    );

    return UserAccessDataModel;
};
