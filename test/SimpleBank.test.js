


// Load compiled artifacts
const SimpleBank = artifacts.require('SimpleBank');

// Load dependencies
const ether = (n) => {
  return new web3.utils.BN(
    web3.utils.toWei(n.toString(), 'ether')
  )  
}

const EVM_REVERT = 'VM Exception while processing transaction: revert';

require('chai')
  .use(require('chai-as-promised'))
  .should()


  // Start test block
contract('SimpleBank', ([deployer]) => {
  let simpleBank
   
  describe('depositing ether', () => {
    let result
    let amount
    
    beforeEach( async () => {
      // Deploy a new SimpleBank contract for each test
      simpleBank = await SimpleBank.new();
      amount = ether(1); 
      result = await simpleBank.deposit({ from: deployer, value: amount });     
    });
  
    // test cases
    it('tracks ether deposit', async () => {
      const balance = await simpleBank.balances(deployer)
      balance.toString().should.equal(amount.toString())
    });

    it('emits a LogDepositMade event', async () => {
      const log = result.logs[0]
      log.event.should.equal('LogDepositMade')
      const event = log.args
      event.accountAddress.should.equal(deployer, 'depositer address correct')
      event.amount.toString().should.equal(amount.toString(), 'event amount correct')
    })
  })

  describe('withdrawing ether', () => {
    let depositResult
    let depositAmount
    let withdrawAmount
    let result

    describe('success', () => {
      beforeEach(async () => {
        simpleBank = await SimpleBank.new();
        //deposit ether first
        depositAmount = ether(2) 
        depositResult = await simpleBank.deposit({ from: deployer, value: depositAmount });
        // then withdraw ether
        withdrawAmount = ether(1)
        result = await simpleBank.withdraw(withdrawAmount)
        
      })
  
      it('tracks withdraw and updates balance', async () => {
        const balance = await simpleBank.balances(deployer)
        balance.toString().should.equal(ether(1).toString())
      })
  
      it('emits a LogWithdrawMade event', async () => {
        const log = result.logs[0]
        log.event.should.equal('LogWithdrawMade')
        const event = log.args
        event.accountAddress.should.equal(deployer, 'depositer address correct')
        event.amount.toString().should.equal(withdrawAmount.toString(), 'event amount correct')
      })
    })

    describe('failure', async () => {
      it('reverts if withdraw amount is more than user balance', async () => {
        await simpleBank.withdraw(ether(100), { from: deployer }).should.be.rejectedWith(EVM_REVERT)
      })

      


    })

    
  })
  

});