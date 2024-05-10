module.exports = (sequelize, DataTypes, Model) => {
  class SubscribeType extends Model {}

  SubscribeType.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "subscribeType",
      tableName: "subscribeTypes",
    }
  );
  return SubscribeType;
};
