const dbConfig = require("../config/database.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

console.log(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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
const dynamicConnections = {};
const orgModels = {};

db.sequelize.sync({ force: false }).then(() => {
  console.log("SYNC DONE");

  //connect other DB
  connectAllDB();
});

const connectAllDB = async () => {
  const OrgSettingsModel = db.OrgSettings;
  const orgSettings = await OrgSettingsModel.findAll({
    attributes: ["orgDB"],
  });

  for (let i = 0; i < orgSettings.length; ++i) {
    let sequelizeOrg;

    console.log(
      orgSettings[i]?.dataValues?.orgDB,
      dbConfig.USER,
      dbConfig.PASSWORD,
      {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
      }
    );

    sequelizeOrg = new Sequelize(
      orgSettings[i]?.dataValues?.orgDB,
      dbConfig.USER,
      dbConfig.PASSWORD,
      {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
      }
    );

    sequelizeOrg
      .authenticate()
      .then(() => {
        console.log("CONNECTED DB", orgSettings[i]?.dataValues?.orgDB);
      })
      .catch((err) => {
        console.log("SEQ CON ERR", orgSettings[i]?.dataValues?.orgDB, err);
      });

    let orgDBInstance = {};

    orgDBInstance.Sequelize = Sequelize;

    orgDBInstance.sequelize = sequelizeOrg;

    //models import
    orgDBInstance.Customer = require("./Customer.models.js")(
      sequelizeOrg,
      DataTypes
    );

    orgDBInstance.sequelize.sync({ force: false }).then(() => {
      console.log("SYNC DONE", orgSettings[i]?.dataValues?.orgDB);
    });

    orgModels[orgSettings[i]?.dataValues?.orgDB] = orgDBInstance;
  }

  // console.log(orgModels);
};

//relation

db.OrgSettings.hasMany(db.OrgDomain, { foreignKey: "orgId", as: "orgDomains" });
db.OrgDomain.belongsTo(db.OrgSettings, {
  foreignKey: "orgId",
  as: "orgSetting",
});

db.orgModels = orgModels;

module.exports = db;
