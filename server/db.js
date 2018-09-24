'use strict';

const mongoClient = require('mongodb').MongoClient;
var Promise = require("bluebird");
const { dbUrl } = require('./config')

let base = null;

function open(database) {
  var url = dbUrl;
  return new Promise((resolve, reject) => {
    // Use connect method to connect to the Server
    mongoClient.connect(url, (err, db) => {
      if (err) {
        reject(err);
      } else {
        base = db;
        const dbo = db.db(database);
        resolve(dbo);
      }
    });
  });
}

function close() {
  //Close connection
  if (base) {
    base.close();
  }
}

let db = {
  open: open,
  close: close
}

module.exports = db;
