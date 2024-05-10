module.exports = (sequelize, DataTypes, Model) => {
  class Subscribe extends Model {}

  Subscribe.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        unique: true,
      },
      isVerified: {
        type: DataTypes.STRING,
        allowNull: false,
        default: false,
      },
    },
    {
      sequelize,
      modelName: "subscribe",
      tableName: "subscribes",
    }
  );
  return Subscribe;
};
