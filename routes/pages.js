const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const status = require("status");

const folderDir = "../pages";
const fileExtention = "html";

router.get("/", status.requireToken, (req, res) => {
  fs.readFile(
    path.join(
      __dirname,
      `${folderDir}/${req.body.decoded.name}.${fileExtention}`
    ),
    (err, data) => {
      if (err) res.sendStatus(500);
      else res.send(data);
    }
  );
});

router.get("/all", status.requireAdmin, (req, res) => {
  fs.readdir(path.join(__dirname, folderDir), (err, files) => {
    if (err) res.sendStatus(500);
    else res.send(files);
  });
});

module.exports = router;
