module.exports = (sequelize, DataTypes, Model) => {
  class ArticleLike extends Model {}

  ArticleLike.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      like: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "articleLike",
      tableName: "articleLikes",
      indexes: [{ unique: true, fields: ["userId", "articleId"] }],
    }
  );
  return ArticleLike;
};
