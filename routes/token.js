const status = require("../mixins/status");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.get("/generate", status.requireAdmin, (req, res) => {
  res.send({ token: jwt.sign({ name: req.body.name }, status.secret) });
});

router.get("/resolve", status.requireToken, (req, res) => {
  res.send(req.body.decoded);
});

router.get("/admin", status.requireAdmin, (req, res) => {
  res.send({ token: jwt.sign({ name: "admin" }, status.secret) });
});

module.exports = router;
