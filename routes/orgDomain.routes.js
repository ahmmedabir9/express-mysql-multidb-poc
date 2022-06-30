const { Router } = require("express");
const {
  createOrgDomain,
  getAllOrgDomain,
} = require("../controllers/orgDomain.controller");

const router = Router();

router.post("/add-org-domain", createOrgDomain);
router.get("/get-all-org-domain", getAllOrgDomain);

module.exports = router;
