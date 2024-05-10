module.exports = (sequelize, DataTypes, Model) => {
  class VisterMsg extends Model {}

  VisterMsg.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
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
      modelName: "visterMsg",
      tableName: "visterMsgs",
    }
  );
  return VisterMsg;
};
