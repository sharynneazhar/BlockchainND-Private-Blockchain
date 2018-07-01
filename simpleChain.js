/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const leveldb = require('./leveldbhelper');

/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');


/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class Block {
  constructor(data) {
    this.hash = "",
      this.height = 0,
      this.body = data,
      this.time = 0,
      this.previousBlockHash = ""
  }
}

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain {
  constructor() {
    this.chainHeight = -1;
    this.addBlock(new Block("First block in the chain - Genesis block"));
  }

  // Add new block
  async addBlock(newBlock) {
    // Block height
    newBlock.height = this.chainHeight + 1;
    // UTC timestamp
    newBlock.time = new Date().getTime().toString().slice(0, -3);
    // Link previous block hash
    if (newBlock.height > 0) {
      const prevBlock = await leveldb.getBlock(newBlock.height - 1);
      newBlock.previousBlockHash = prevBlock.hash;
    }
    // Block hash with SHA256 using newBlock and converting to a string
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    // Add to LevelDB store
    await leveldb.addBlock(newBlock.height, JSON.stringify(newBlock));
    // Update height
    this.chainHeight = newBlock.height;
  }

  // Get block height
  async getBlockHeight() {
    const height = await leveldb.getBlockHeight();
    return height;
  }

  // get block
  async getBlock(blockHeight) {
    const block = await leveldb.getBlock(blockHeight);
    return JSON.parse(block);
  }

  // get chain
  async getChain() {
    const chain = await leveldb.getChain();
    return chain;
  }

  // validate block
  async validateBlock(blockHeight) {
    // get block object
    const block = await leveldb.getBlock(blockHeight);
    // get block hash
    let blockHash = block.hash;
    // remove block hash to test block integrity
    block.hash = '';
    // generate block hash
    let validBlockHash = SHA256(JSON.stringify(block)).toString();
    // Compare
    if (blockHash === validBlockHash) {
      console.log('Block #' + blockHeight + ' validated');
      return true;
    } else {
      console.log('Block #' + blockHeight + ' invalid hash:\n' + blockHash + '<>' + validBlockHash);
      return false;
    }
  }

  // Validate blockchain
  async validateChain() {
    const chain = await leveldb.getChain();
    let errorLog = [];

    for (var i = 0; i < chain.length - 1; i++) {
      // validate block
      if (!this.validateBlock(i)) errorLog.push(i);
      // compare blocks hash link
      let blockHash = chain[i].hash;
      let previousHash = chain[i + 1].previousBlockHash;
      if (blockHash !== previousHash) errorLog.push(i);
    }

    if (errorLog.length > 0) {
      console.log('Block errors = ' + errorLog.length);
      console.log('Blocks: ' + errorLog);
    } else {
      console.log('No errors detected');
    }
  }
}

let blockchain = new Blockchain();
blockchain.addBlock(new Block("test data " + 1))
  .then(() => blockchain.addBlock(new Block("test data " + 2))
  .then(() => blockchain.addBlock(new Block("test data " + 3)))
  .then(() => blockchain.addBlock(new Block("test data " + 4)))
  .then(() => blockchain.addBlock(new Block("test data " + 5)))
  .then(() => blockchain.addBlock(new Block("test data " + 6)))
  .then(() => blockchain.addBlock(new Block("test data " + 7)))
  .then(() => blockchain.addBlock(new Block("test data " + 8)))
  .then(() => blockchain.addBlock(new Block("test data " + 9)))
)

setTimeout(function() {
  blockchain.validateChain();
}, 1000)
