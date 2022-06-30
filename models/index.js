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
db.OrgDomain = require("./OrgDomain.models.js")(sequelize, DataTypes);

//all org DB connection
const allDB = {};
const allModels = {};

const connectAllDB = async () => {
  const OrgSettingsModel = db.OrgSettings;
  const orgSettings = await OrgSettingsModel.findAll({
    attributes: ["orgDB"],
  });

  for (let i = 0; i < orgSettings.length; ++i) {
    console.log(orgSettings[i]?.dataValues?.orgDB);
    allDB[orgSettings[i]?.dataValues?.orgDB] = new Sequelize(
      orgSettings[i]?.dataValues?.orgDB,
      dbConfig.USER,
      dbConfig.PASSWORD,
      {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool: {
          max: dbConfig.pool.max,
          min: dbConfig.pool.min,
          acquire: dbConfig.pool.acquire,
          idle: dbConfig.pool.idle,
        },
      }
    );

    allDB[orgSettings[i]?.dataValues?.orgDB]
      .authenticate()
      .then(() => {
        console.log("CONNECTED DB", orgSettings[i]?.dataValues?.orgDB);
      })
      .catch((err) => {
        console.log("SEQ CON ERR", orgSettings[i]?.dataValues?.orgDB, err);
      });

    allModels[orgSettings[i]?.dataValues?.orgDB] = {};

    allModels[orgSettings[i]?.dataValues?.orgDB].Sequelize = Sequelize;

    allModels[orgSettings[i]?.dataValues?.orgDB].sequelize =
      allDB[orgSettings[i]?.dataValues?.orgDB];

    allModels[orgSettings[i]?.dataValues?.orgDB].sequelize
      .sync({ force: false })
      .then(() => {
        console.log("SYNC DONE", orgSettings[i]?.dataValues?.orgDB);
      });
  }
};

db.sequelize.sync({ force: false }).then(() => {
  console.log("SYNC DONE");

  //connect other DB
  connectAllDB();
});

//relation

db.OrgSettings.hasMany(db.OrgDomain, { foreignKey: "orgId", as: "orgDomains" });
db.OrgDomain.belongsTo(db.OrgSettings, {
  foreignKey: "orgId",
  as: "orgSetting",
});

module.exports = db;
