module.exports = (sequelize, DataTypes, Model) => {
  class Article extends Model {}

  Article.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      shortContent: {
        type: DataTypes.STRING(255),
      },
      content: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING,
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isStoped: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      stopMsg: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "article",
      tableName: "articles",
    }
  );
  Article.prototype.toJson = function () {
    const values = { ...this.get() };
    delete values.articleCategoryId;
    delete values.writterId;
    delete values.published;
    delete values.createdAt;
    return values;
  };
  return Article;
};
