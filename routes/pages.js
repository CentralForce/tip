const express = require("express");
const router = express.Router();
const status = require("../mixins/status");
const db = require("../mixins/db");

router.get("/get", status.requireToken, async (req, res) => {
  const page = await db.getPage(req.body.decoded.name);
  if (page) res.send(page);
  else res.sendStatus(500);
});

router.get("/all", status.requireAdmin, async (req, res) => {
  res.send(await db.getAllPages());
});

router.get("/create", status.requireAdmin, async (req, res) => {
  res.sendStatus(
    (await db.createPage(req.body.name, req.body.data)) ? 200 : 500
  );
});

router.get("/update", status.requireAdmin, async (req, res) => {
  res.sendStatus(
    (await db.updatePage(req.body.name, req.body.data)) ? 200 : 500
  );
});

router.get("/remove", status.requireAdmin, async (req, res) => {
  res.sendStatus((await db.removePage(req.body.name)) ? 200 : 500);
});

module.exports = router;
