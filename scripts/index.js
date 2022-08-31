module.exports = async function main (callback) {
  try {

    const SimpleBank = artifacts.require('SimpleBank');
    const simpleBank = await SimpleBank.deployed();

    await simpleBank.deposit({ value: 2});

    const balanceAfterDeposit = await simpleBank.balance();
    console.log('balance is:', balanceAfterDeposit.toString()); 
    
    await simpleBank.withdraw(1);

    const balanceAfterWithdraw = await simpleBank.balance();
    console.log('balance is:', balanceAfterWithdraw.toString()); 

    callback(0);
  } catch (error) {
    console.error(error);
    callback(1);
  }
};