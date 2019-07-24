const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const secret = "my-secret";

router.get("/generate", (req, res) => {
  const name = req.body.name;
  const admin = req.body.admin;
  jwt.verify(admin, secret, (err, decoded) => {
    if (err || decoded.name != "admin") res.sendStatus(401);
    else res.send(jwt.sign({ name }, secret));
  });
});

router.get("/resolve", (req, res) => {
  const token = req.body.token;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) res.sendStatus(401);
    else res.send(decoded);
  });
});

router.get("/admin", (req, res) => {
  res.send(jwt.sign({ name: "admin" }, secret));
});

module.exports = router;
