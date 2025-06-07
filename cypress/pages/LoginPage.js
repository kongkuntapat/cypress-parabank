class LoginPage {
    visit() {
        cy.visit('/');
    }

    fillUsername(username) {
        cy.get('input[name="username"]').type(username);
    }

    fillPassword(password) {
        cy.get('input[name="password"]').type(password);
    }

    submit() {
        cy.get('input[value="Log In"]').click();
    }

    verifyLoginFailed() {
        cy.get('p.error').should('be.visible')
          .and('contain.text', 'The username and password could not be verified.');
    }
}
export default LoginPage;