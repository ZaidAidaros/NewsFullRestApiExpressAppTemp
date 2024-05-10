module.exports = (sequelize, DataTypes, Model) => {
  class Notification extends Model {}

  Notification.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isReaded: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "notification",
      tableName: "notifications",
    }
  );
  return Notification;
};
