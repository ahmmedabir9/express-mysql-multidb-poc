const db = require("../models");
const { response } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");
const OrgSettings = db.OrgSettings;

const createOrgSettings = async (req, res) => {
  const { orgDB, orgName } = req.body;

  try {
    const orgSettings = await OrgSettings.create({
      orgDB: orgDB,
      orgName: orgName,
    });

    if (!orgSettings) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        null,
        "Could Not Create ORG"
      );
    }

    return response(res, StatusCodes.ACCEPTED, true, orgSettings, null);
  } catch (error) {
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      error.message
    );
  }
};

const getAllOrgSettings = async (req, res) => {
  try {
    const orgSettings = await OrgSettings.findAll({});

    if (!orgSettings || orgSettings?.length === 0) {
      return response(res, StatusCodes.NOT_FOUND, false, null, "NO ORG Found");
    }

    return response(res, StatusCodes.OK, true, orgSettings, null);
  } catch (error) {
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      null,
      error.message
    );
  }
};

module.exports = {
  createOrgSettings,
  getAllOrgSettings,
};
