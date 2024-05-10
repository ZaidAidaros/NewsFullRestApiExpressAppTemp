module.exports = (sequelize, DataTypes, Model) => {
  class ArticleComment extends Model {}

  ArticleComment.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "articleComment",
      tableName: "articleComments",
    }
  );
  return ArticleComment;
};
