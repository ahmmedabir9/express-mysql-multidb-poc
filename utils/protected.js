const { verify } = require("jsonwebtoken");
const { config } = require("./config");

//verify token of user request
const verifyToken = async (token) => {
  if (!token) {
    return;
  }
  try {
    const payload = await verify(token, config.secrets.jwt);

    if (payload) {
      return payload;
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

module.exports = { verifyToken };
