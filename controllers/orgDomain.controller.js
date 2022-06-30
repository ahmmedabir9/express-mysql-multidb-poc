const db = require("../models");
const { response } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");
const { OrgSettings } = require("../models");
const OrgDomain = db.OrgDomain;

const createOrgDomain = async (req, res) => {
  const { orgId, domain } = req.body;

  try {
    const orgDomain = await OrgDomain.create({
      orgId: orgId,
      domain: domain,
    });

    if (!orgDomain) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        null,
        "Could Not Create ORG Domain"
      );
    }

    return response(res, StatusCodes.ACCEPTED, true, orgDomain, null);
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

const getAllOrgDomain = async (req, res) => {
  try {
    const orgDomain = await OrgDomain.findAll({
      include: [
        {
          model: OrgSettings,
          as: "orgSetting",
        },
      ],
    });

    if (!orgDomain || orgDomain?.length === 0) {
      return response(res, StatusCodes.NOT_FOUND, false, null, "NO ORG Found");
    }

    return response(res, StatusCodes.OK, true, orgDomain, null);
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
  createOrgDomain,
  getAllOrgDomain,
};
