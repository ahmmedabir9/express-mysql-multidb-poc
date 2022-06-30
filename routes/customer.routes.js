const { Router } = require("express");
const { createCustomer } = require("../controllers/customer.controller");

const router = Router();

router.post("/create-customer", createCustomer);

module.exports = router;
