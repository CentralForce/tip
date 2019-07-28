const process = require("process");
const jwt = require("jsonwebtoken");
const db = require("../mixins/db");

class status {
  secret = "my-secret";
  isAdmin = process.argv.filter(e => e.trim().includes("admin")).length > 0;
  requireAdmin = (req, res, next) => {
    if (this.isAdmin) next();
    else res.sendStatus(401);
  };
  requireToken = async (req, res, next) => {
    if (req.header("Authorization") != undefined) {
      const token = req.header("Authorization").replace("Bearer ", "");
      jwt.verify(token, this.secret, async (err, decoded) => {
        if (!err && (await db.getPage(decoded.name)) !== undefined) {
          req.body.decoded = decoded;
          next();
        } else res.sendStatus(401);
      });
    } else res.sendStatus(401);
  };
}

module.exports = new status();
