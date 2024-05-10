module.exports = (sequelize, DataTypes, Model) => {
  class Ads extends Model {}

  Ads.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      compName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adsName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adsDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adsImg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        unique: true,
      },
      isApproved: {
        type: DataTypes.STRING,
        allowNull: false,
        default: false,
      },
      isPaid: {
        type: DataTypes.STRING,
        allowNull: false,
        default: false,
      },
    },
    {
      sequelize,
      modelName: "ads",
      tableName: "ads",
    }
  );
  return Ads;
};
