const { Model } = require('sequelize');

/* Defining the model for the user feedback table. */
module.exports = (sequelize, DataTypes) => {
  /* This is defining the columns of the table. */
  class UserFeedbackModal extends Model {}

  UserFeedbackModal.init(
    {
      /* This is creating a unique id for each row in the table. */
      userName: {
        type: DataTypes.STRING,
      },
      userEmailId: {
        type: DataTypes.STRING,
      },
      /* Column to store rating. */
      rating: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      /* Column to store Module Name. */
      moduleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userRole: {
        type: DataTypes.STRING,
      },
      /* Column to store feedback text. */
      feedbackText: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'UserFeedbackModal',
      tableName: 'new_user_feedback',
      underscored: true,
    },
  );

  return UserFeedbackModal;
};
