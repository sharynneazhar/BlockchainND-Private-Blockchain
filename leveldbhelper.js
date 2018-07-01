/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

module.exports = {
  addBlock: (key, value) => {
    return new Promise((resolve, reject) => {
      db.put(key, value, (err) => {
        if (err) reject(err);
        resolve('Added block #' + key);
      });
    });
  },

  getBlock: (key) => {
    return new Promise((resolve, reject) => {
      db.get(key, (err, value) => {
        if (err) reject(err);
        resolve(JSON.parse(value));
      });
    });
  },

  getBlockHeight: () => {
    return new Promise((resolve, reject) => {
      let height = 0;
      db.createReadStream().on('data', (data) => {
        console.log(data.key);
        height++;
      }).on('error', (err) => {
        reject(err);
      }).on('close', () => {
        resolve(height);
      });
    });
  },

  getChain: () => {
    return new Promise((resolve, reject) => {
      let chain = [];
      db.createReadStream().on('data', (data) => {
        chain.push(JSON.parse(data.value));
      }).on('error', (err) => {
        reject(err)
      }).on('close', () => {
        resolve(chain);
      });
    });
  }
}