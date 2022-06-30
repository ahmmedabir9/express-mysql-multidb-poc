const { Router } = require("express");
const {
  createOrgSettings,
  getAllOrgSettings,
  getOrgToken,
} = require("../controllers/orgSettings.controller");

const router = Router();

router.post("/add-org-settings", createOrgSettings);
router.get("/get-all-org-settings", getAllOrgSettings);
router.get("/get-org-token/:domain", getOrgToken);

module.exports = router;
