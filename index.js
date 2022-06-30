const express = require("express");
const app = express();
const cors = require("cors");

// const db = require("./models");

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const orgSettingsRouter = require("./routes/orgSettings.routes.js");
const orgDomainRouter = require("./routes/orgDomain.routes.js");
const customerRouter = require("./routes/customer.routes.js");
const { verifyOrg } = require("./utils/protected.js");

app.use("/api/customer", verifyOrg, customerRouter);
app.use("/api/org-domain", orgDomainRouter);
app.use("/api/org-settings", orgSettingsRouter);

app.listen(5050, () => {
  console.log("POC SERVER RUNNING");
});
