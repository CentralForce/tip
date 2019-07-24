const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const jwt = require("jsonwebtoken");
const secret = "my-secret";

router.get("/", (req, res) => {
  const token = req.body.token;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) res.sendStatus(401);
    else {
      fs.readFile(
        path.join(__dirname, `../pages/${decoded.name}.html`),
        { encoding: "utf-8" },
        (err, data) => {
          if (err) res.sendStatus(500);
          else res.send(data);
        }
      );
    }
  });
});

module.exports = router;
