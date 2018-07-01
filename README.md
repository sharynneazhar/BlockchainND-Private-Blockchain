# Blockchain Data

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Configuring your project

- Use NPM to initialize your project and create package.json to store project dependencies.
```
npm init
```
- Install crypto-js with --save flag to save dependency to our package.json file
```
npm install crypto-js --save
```
- Install level with --save flag
```
npm install level --save
```

## Testing

To test code:
1: Open a command prompt or shell terminal after install node.js.
2: Enter the following command:
```
node simpleChain.js
```

To test manually:
1: Open a command prompt or shell terminal after install node.js.
2: Enter the following command:
3: Copy and paste your code into your node session
4: Instantiate blockchain with blockchain variable
```
let blockchain = new Blockchain();
```
5: Generate 10 blocks using a for loop
```
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
```
6: Validate blockchain
```
setTimeout(function() {
  blockchain.validateChain();
}, 1000)
```
