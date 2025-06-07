class AccountPage {
    verifyWelcomeMessage(fullName) {
        cy.get('p.smallText').should('contain.text', `Welcome ${fullName}`);
    }

    verifyAccountServices() {
        cy.get('#leftPanel h2').should('have.text', 'Account Services');
    }

    getAccountBalance(accountNumber) {
        return cy.get('#accountTable tbody tr')
            .contains('td', accountNumber)
            .next()
            .invoke('text')
            .then(text => {
                return parseFloat(text.replace(/[^0-9.-]+/g, ""));
            });
    }

    openNewAccount(accountType) {
        cy.get('#leftPanel a[href*="openaccount.htm"]').click();
        cy.get('#type').select(accountType);

        cy.get('body').then(($body) => {
            if ($body.find('#fromAccountId').length > 0) {
                cy.get('#fromAccountId').select(0);
            }
        });

        cy.get('input[value="Open New Account"]').click();
        cy.wait(500); 
        cy.get('h1.title').should('contain', 'Account Opened!');
    }

    clickLogout() {
        cy.get('a[href*="logout.htm"]').click();
    }
}
export default AccountPage;