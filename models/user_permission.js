module.exports = (sequelize, DataTypes, Model) => {
  class UserPermission extends Model {}

  UserPermission.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      permission: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "userPermission",
      tableName: "userPermissions",
    }
  );
  return UserPermission;
};
