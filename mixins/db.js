const Datastore = require("nedb");
const path = require("path");
const dbPages = new Datastore({
  filename: path.join(__dirname, "../db/pages.json"),
  autoload: true
});

class db {
  createPage(name, data) {
    return new Promise(async res => {
      if (!(await this.getPage(name)))
        dbPages.insert({ name, data }, err => res(err ? false : true));
      else res(false);
    });
  }

  updatePage(name, data) {
    return new Promise(res => {
      dbPages.update({ name }, { name, data }, { multi: true }, (err, amount) =>
        res(err || amount < 1 ? false : true)
      );
    });
  }

  removePage(name) {
    return new Promise(res => {
      dbPages.remove({ name }, { multi: true }, err => res(err ? false : true));
    });
  }

  getPage(name) {
    return new Promise(res => {
      dbPages.findOne({ name }, (err, doc) => {
        if (err) res(undefined);
        else res(doc == null ? undefined : doc);
      });
    });
  }

  getAllPages() {
    return new Promise(res => {
      dbPages.find({}, (err, doc) => {
        if (err) res([]);
        else res(doc);
      });
    });
  }
}

module.exports = new db();
