module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: null,
  DB: "ekyc-org",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
