const { Router } = require("express");
const {
  createCustomer,
  getAllCustomers,
} = require("../controllers/customer.controller");

const router = Router();

router.post("/create-customer", createCustomer);
router.get("/get-all-customers", getAllCustomers);

module.exports = router;
