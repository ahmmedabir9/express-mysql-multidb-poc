const { Router } = require("express");
const {
  createOrgSettings,
  getAllOrgSettings,
} = require("../controllers/orgSettings.controller");

const router = Router();

router.post("/add-org-settings", createOrgSettings);
router.get("/get-all-org-settings", getAllOrgSettings);

module.exports = router;
