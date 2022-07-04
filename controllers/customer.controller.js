const db = require("../models");
const orgModels = require("../models");
const { response } = require("../utils/response");
const { StatusCodes } = require("http-status-codes");
const { OrgDomain } = require("../models");
const { createOrgToken } = require("../utils/config");
const OrgSettings = db.OrgSettings;

const createCustomer = async (req, res) => {
  const { name, email, phone } = req.body;

  const org = req.org;

  try {
    if (!name || !email) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        null,
        "Name and Email Are required Field"
      );
    }

    const CustomerModel = db.orgModels[org].Customer;

    const customer = await CustomerModel.create({
      name,
      email,
      phone,
    });

    if (!customer) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        null,
        "Could Not Create ORG"
      );
    }

    return response(res, StatusCodes.ACCEPTED, true, customer, null);
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

const getAllCustomers = async (req, res) => {
  const org = req.org;

  try {
    const CustomerModel = db.orgModels[org].Customer;

    const customer = await CustomerModel.findAll({});

    if (!customer) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        null,
        "Could Not Create ORG"
      );
    }

    return response(res, StatusCodes.ACCEPTED, true, customer, null);
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
  createCustomer,
  getAllCustomers,
};
