const { sign } = require("jsonwebtoken");

const config = {
  secrets: {
    jwt: "PJaHvt8ASQdSg5YI42sdvggy4c8ar9dddTsddHb3nzLhu5Rx59f8gvqs227sagB4n67hUz4rvW92zsKvN6zbPIub",
    jwtExp: "30d",
  },
};

const createOrgToken = async (org) => {
  return sign(
    {
      id: org.id,
      orgDB: org.orgDB,
    },
    config.secrets.jwt,
    {
      expiresIn: config.secrets.jwtExp,
    }
  );
};

module.exports = { createOrgToken };
