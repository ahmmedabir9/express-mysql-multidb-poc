const { sign } = require("jsonwebtoken");

const config = {
  secrets: {
    jwt: "PJaHvt8ASQdSg5YI42sdvggy4c8ar9dddTsddHb3nzLhu5Rx59f8gvqs227sagB4n67hUz4rvW92zsKvN6zbPIub",
    jwtExp: "30d",
  },
};

const createToken = (user) => {
  return sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      photo: user.photo,
      phone: user.phone,
      role: user.role,
    },
    config.secrets.jwt,
    {
      expiresIn: config.secrets.jwtExp,
    }
  );
};
const createTokenAdmin = (user) => {
  return sign(
    {
      _id: user._id,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: user.role,
    },
    config.secrets.jwt,
    {
      expiresIn: config.secrets.jwtExp,
    }
  );
};

module.exports = { createToken, createTokenAdmin, config, baseUrl };
