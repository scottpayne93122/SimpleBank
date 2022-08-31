# SIMPLE BANK SMART CONTRACT

This is a simple bank smart contract that allows the deployer to deposit, withdraw and check the balance in Ether.

The main purpose is to practice writing unit tests in JS to check solidity code using truffle.

# DEPENDENCIES

node v14.16.1
truffle
chai
chai-as-promised
mocha
web3

# TO RUN LOCALLY

1. Clone Repo
2. npm install
3. make sure solc version is 0.6.6 inside truffle-config.js file under compilers
4. make sure you have truffle cli (local blockchain) installed, if not install with npm
5. run truffle-cli and open new tab in terminal using cd SimpleBank
6. run truffle test from command line to test functions of solidity file
