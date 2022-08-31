const SimpleBank = artifacts.require('SimpleBank');

module.exports = async function (deployer) {
  await deployer.deploy(SimpleBank);
};