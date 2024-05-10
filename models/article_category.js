module.exports = (sequelize, DataTypes, Model) => {
  class ArticleCategory extends Model {}

  ArticleCategory.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "articleCategory",
      tableName: "articleCategories",
    }
  );
  return ArticleCategory;
};
