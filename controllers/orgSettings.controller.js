const db = require("../models");
const { response } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");
const { OrgDomain } = require("../models");
const { createOrgToken } = require("../utils/config");
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
    const orgSettings = await OrgSettings.findAll({
      include: [
        {
          model: OrgDomain,
          as: "orgDomains",
        },
      ],
    });

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

const getOrgToken = async (req, res) => {
  const { domain } = req.params;
  try {
    const orgDomain = await OrgDomain.findOne({
      where: { domain: domain },
      include: [
        {
          model: OrgSettings,
          as: "orgSetting",
        },
      ],
    });

    if (!orgDomain?.orgSetting) {
      return response(
        res,
        StatusCodes.NOT_FOUND,
        false,
        null,
        "NO ORG Found with this domain"
      );
    }

    const orgToken = await createOrgToken(orgDomain?.orgSetting);

    if (!orgToken) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        null,
        "Could Not Create Site Token!"
      );
    }

    return response(
      res,
      StatusCodes.OK,
      true,
      { token: orgToken, ...orgDomain.orgSetting?.dataValues },
      null
    );
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
  getOrgToken,
  getAllOrgSettings,
};
