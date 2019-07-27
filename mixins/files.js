const fs = require("fs");
const path = require("path");

class files {
  pages = fs
    .readdirSync(path.join(__dirname, "../pages"))
    .map(e => e.match(/(.*)\./gm)[0].replace(".", ""));
}

module.exports = new files();
