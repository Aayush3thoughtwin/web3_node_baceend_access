const ThoughtwinCoin = artifacts.require("ThoughtwinCoin");
const BigNumber = require('bignumber.js');
module.exports = function (deployer) {
  deployer.deploy(ThoughtwinCoin,new BigNumber(1000*10**18));
};
