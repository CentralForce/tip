const process = require("process");
const jwt = require("jsonwebtoken");
const files = require("../mixins/files");

class status {
  secret = "my-secret";
  isAdmin = process.argv.filter(e => e.trim().includes("admin")).length > 0;
  requireAdmin = (req, res, next) => {
    if (this.isAdmin) next();
    else res.sendStatus(401);
  };
  requireToken = (req, res, next) => {
    if (req.body.token != undefined) {
      jwt.verify(req.body.token, this.secret, (err, decoded) => {
        if (!err && files.pages.includes(decoded.name)) {
          req.body.decoded = decoded;
          next();
        } else res.sendStatus(401);
      });
    } else res.sendStatus(401);
  };
}

module.exports = new status();
