import AccountPage from '../pages/AccountPage';
import TransferFundsPage from '../pages/TransferFundsPage';

describe.skip('Fund Transfer Feature', () => {

    beforeEach(() => {
        const accountPage = new AccountPage();
        cy.fixture('created_user').then(user => {
            cy.login(user.username, user.password);
        });
        cy.visit('/overview.htm');
        accountPage.openNewAccount('CHECKING');
        accountPage.openNewAccount('SAVINGS');
        cy.visit('/overview.htm');
    });

    it('should transfer funds successfully and update account balances correctly', function() {
        const accountPage = new AccountPage();
        const transferPage = new TransferFundsPage();
        const transferAmount = 150; 

        let fromAccountNumber, toAccountNumber;
        let fromAccountInitialBalance, toAccountInitialBalance;

        cy.get('#accountTable tbody td a.ng-binding').should('have.length', 2);
        cy.get('#accountTable tbody tr:nth-child(1) a').invoke('text').then(accNum => {
            fromAccountNumber = accNum;
        });
        cy.get('#accountTable tbody tr:nth-child(2) a').invoke('text').then(accNum => {
            toAccountNumber = accNum;
        });

        cy.then(() => {
            accountPage.getAccountBalance(fromAccountNumber).then(balance => {
                fromAccountInitialBalance = balance;
            });
            accountPage.getAccountBalance(toAccountNumber).then(balance => {
                toAccountInitialBalance = balance;
            });
        });

        cy.then(() => {
            transferPage.visit();
            transferPage.fillAmount(transferAmount);
            transferPage.selectFromAccount(fromAccountNumber);
            transferPage.selectToAccount(toAccountNumber);
            transferPage.submitTransfer();
        });
        
        transferPage.verifyTransferSuccess(transferAmount.toFixed(2));

        cy.visit('/overview.htm');
        cy.then(() => {
            accountPage.getAccountBalance(fromAccountNumber).should(
                'eq', 
                fromAccountInitialBalance - transferAmount
            );
            accountPage.getAccountBalance(toAccountNumber).should(
                'eq', 
                toAccountInitialBalance + transferAmount
            );
        });
    });
});