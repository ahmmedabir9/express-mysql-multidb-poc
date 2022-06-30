const { StatusCodes } = require("http-status-codes");
const { verify } = require("jsonwebtoken");
const { response } = require("./response");

const config = {
  secrets: {
    jwt: "PJaHvt8ASQdSg5YI42sdvggy4c8ar9dddTsddHb3nzLhu5Rx59f8gvqs227sagB4n67hUz4rvW92zsKvN6zbPIub",
    jwtExp: "30d",
  },
};

//verify token of user request
const verifyToken = async (token) => {
  console.log(token);
  if (!token) {
    return;
  }
  console.log("CREDD", token, config.secrets.jwt);
  try {
    const payload = await verify(token, config.secrets.jwt);
    console.log(payload);

    if (payload) {
      return payload;
    } else {
      return;
    }
  } catch (error) {
    return;
  }
};

const verifyOrg = async (req, res, next) => {
  const token = req.headers.orgtoken;
  if (token) {
    try {
      const payload = await verifyToken(token);
      console.log(payload);
      if (!payload?.orgDB) {
        return response(
          res,
          StatusCodes.NOT_ACCEPTABLE,
          false,
          null,
          "ORG Token not Acceptable"
        );
      }

      req.org = payload?.orgDB;
      next();
    } catch (error) {
      return response(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        false,
        null,
        error?.message
      );
    }
  } else {
    return response(
      res,
      StatusCodes.NOT_ACCEPTABLE,
      false,
      null,
      "ORG Token not Found"
    );
  }
};

module.exports = { verifyToken, verifyOrg };
