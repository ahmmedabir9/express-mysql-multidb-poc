const dbConfig = require("../config/database.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED DB");
  })
  .catch((err) => {
    console.log("SEQ CON ERR", err);
  });

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.OrgSettings = require("./OrgSettings.models.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("SYNC DONE");
});

module.exports = db;