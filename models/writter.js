module.exports = (sequelize, DataTypes, Model) => {
  class Writter extends Model {}

  Writter.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      middelName: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      familyName: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.middelName} ${this.lastName}`;
        },
      },
      nickName: {
        type: DataTypes.STRING(15),
        get() {
          if (this.getDataValue("nickName")) {
            return this.getDataValue("nickName").toUpperCase();
          }
          return this.getDataValue("fullName");
        },
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      nic: {
        type: DataTypes.STRING(15),
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
      },
      isStoped: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      references: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notification: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "writter",
      tableName: "writters",
    }
  );
  // Writter.sync({ force: true, logging: false });
  Writter.prototype.toJson = function () {
    const values = { ...this.get() };
    delete values.createdAt;
    delete values.updatedAt;
    delete values.userId;
    return values;
  };
  return Writter;
};
