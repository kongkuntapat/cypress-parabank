class TransferFundsPage {
    visit() {
        cy.get('#leftPanel a[href*="transfer.htm"]').click();
    }

    fillAmount(amount) {
        cy.get('#amount').type(amount);
    }

    selectFromAccount(accountNumber) {
        cy.get('#fromAccountId').select(accountNumber);
    }

    selectToAccount(accountNumber) {
        cy.get('#toAccountId').select(accountNumber);
    }

    submitTransfer() {
        cy.get('input[value="Transfer"]').click();
    }

    verifyTransferSuccess(amount) {
        cy.get('h1.title').should('have.text', 'Transfer Complete!');
        cy.get('#rightPanel .ng-scope p').should(
            'contain.text',
            `$${amount}.00 has been transferred from account`
        );
    }
}

export default TransferFundsPage;