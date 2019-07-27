const filename = "../db";
const Datastore = require("nedb");
const dbPages = new Datastore({
  filename: `${filename}/pages.json`,
  autoload: true
});

class db {
  async createPage(name, data) {
    return new Promise(res => {
        if (await this.getPage(name)) {
            dbPages.insert({ name, data }, err => res(err ? true : false));
        } else res(false);
    });
  }

  async updatePage(name, data) {
    return new Promise(res => {
      dbPages.update({ name }, { name, data }, { multi: true }, err => res(err ? true : false));
    });
  }

  async removePage(name) {
    return new Promise(res => {
      dbPages.remove({ name }, { multi: true }, err => {
        res(err ? true : false);
      });
    });
  }

  async getPage(name) {
    return new Promise(res => {
      dbPages.find({ name }, (err, doc) => {
        if (err) res(undefined);
        else res(doc);
      });
    });
  }

  async getAllPages() {
    return new Promise(res => {
        dbPages.find({}, (err, doc) => {
            if (err) res(undefined);
            else res(doc);
        });
    });
  }
}

module.exports = new db();
