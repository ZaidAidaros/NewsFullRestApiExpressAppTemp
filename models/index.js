const getDBConfig = require("../config/db_config.js");
const initAdminUser = require("../config/init_db.js");
const { Sequelize, DataTypes, Model, json } = require("sequelize");

const sequelize = new Sequelize(getDBConfig(process.env.mode));



const db = {};
db.sequelize = sequelize;


//////////// DB Tables  ///////////////////////////////////////////////////////
db.User = require("./user.js")(sequelize, DataTypes, Model);

db.UserPermission = require("./user_permission.js")(
  sequelize,
  DataTypes,
  Model
);

db.Writter = require("./writter.js")(sequelize, DataTypes, Model);

db.VisterMsg = require("./visters_msg.js")(sequelize, DataTypes, Model);

db.Subscribe = require("./subscribe.js")(sequelize, DataTypes, Model);
db.SubscribeType = require("./subscribe_type.js")(sequelize, DataTypes, Model);

db.ArticleCategory = require("./article_category.js")(
  sequelize,
  DataTypes,
  Model
);

db.Article = require("./article.js")(sequelize, DataTypes, Model);

db.UserBookMark = require("./user_book_mark.js")(sequelize, DataTypes, Model);

db.ArticleLike = require("./article_like.js")(sequelize, DataTypes, Model);

db.ArticleComment = require("./article_comment.js")(
  sequelize,
  DataTypes,
  Model
);

//////////// Relationships  ///////////////////////////////////////////////////////

db.User.belongsTo(db.UserPermission);
db.UserPermission.hasMany(db.User);

db.Subscribe.belongsTo(db.SubscribeType);
db.SubscribeType.hasMany(db.Subscribe);

db.Subscribe.belongsTo(db.User);
db.User.hasMany(db.Subscribe);

db.Writter.belongsTo(db.User);
db.User.hasOne(db.Writter);

db.Article.belongsTo(db.Writter);
db.Writter.hasMany(db.Article);

db.Article.belongsTo(db.ArticleCategory);
db.ArticleCategory.hasMany(db.Article);

db.ArticleLike.belongsTo(db.Article);
db.Article.hasMany(db.ArticleLike);

db.ArticleLike.belongsTo(db.User);
db.User.hasMany(db.ArticleLike);

db.ArticleComment.belongsTo(db.Article);
db.Article.hasMany(db.ArticleComment);

db.ArticleComment.belongsTo(db.User);
db.User.hasMany(db.ArticleComment);

db.UserBookMark.belongsTo(db.User);
db.User.hasMany(db.UserBookMark);

db.UserBookMark.belongsTo(db.Article);
db.Article.hasMany(db.UserBookMark);


//////////// DB Connection, Sync  ///////////////////////////////////////////////////////
console.log("************Start DB Connection************");
sequelize
  .authenticate()
  .then(() => {
    console.log("************DB Authenticated************");
    console.log("***Start Sync DB***");
    sequelize.sync({force:true, logging:false}).then(()=>{
      initAdminUser(db);
      console.log("***DB Sync Finsh***");
    });
    console.log("********************************");
  })
  .catch((error) => {
    console.log("************DB Error************");
    const code = error.parent.code;
    const errno = error.parent.errno;
    const syscall = error.parent.syscall;
    console.error("Error: \n errno:"+errno+"\n code:"+code+"\n syscall:"+syscall);
    console.log("-Check IF DB IS RUNNIG");
    console.log("-Check Auth Info Is Correct");
    console.log("********************************");
    return;
  });

module.exports = db;
