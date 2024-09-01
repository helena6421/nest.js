
const db = require('mongoose');
//const Mongo_url = process.env.MONGO_URL;

db.Promise = global.Promise;

class Connection {
  static connect(Mongo_url) {
    const Mongo_url = process.env.MONGO_URL;
    db.connect(Mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return new Promise((resolve, reject) => {
      db.connection.on('open', () => {
        resolve('SUCCESS');
      }).on('error', (err) => {
        reject(err);
      });
    });
  }

  static disconnect() {
    db.connection.close();
    return new Promise((resolve, reject) => {
      db.connection.on('disconnected', () => {
        resolve('DISCONNECT SUCCESS');
      }).on('error', (err) => {
        reject(err);
      });
    });
  }

}

module.exports = { Connection };