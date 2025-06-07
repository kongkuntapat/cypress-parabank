class RegisterPage {

    visit() {
        cy.visit('/register.htm');
    }

    fillFirstName(firstName) {
        cy.get('input[id="customer.firstName"]').type(firstName);
    }

    fillLastName(lastName) {
        cy.get('input[id="customer.lastName"]').type(lastName);
    }

    fillAddress(address) {
        cy.get('input[id="customer.address.street"]').type(address);
    }

    fillCity(city) {
        cy.get('input[id="customer.address.city"]').type(city);
    }

    fillState(state) {
        cy.get('input[id="customer.address.state"]').type(state);
    }

    fillZipCode(zipCode) {
        cy.get('input[id="customer.address.zipCode"]').type(zipCode);
    }

    fillPhoneNumber(phone) {
        cy.get('input[id="customer.phoneNumber"]').type(phone);
    }

    fillSsn(ssn) {
        cy.get('input[id="customer.ssn"]').type(ssn);
    }

    fillUsername(username) {
        cy.get('input[id="customer.username"]').type(username);
    }

    fillPassword(password) {
        cy.get('input[id="customer.password"]').type(password);
    }

    fillConfirmPassword(password) {
        cy.get('input[id="repeatedPassword"]').type(password);
    }

    submitRegistration() {
        cy.get('input[value="Register"]').click();
    }

    verifyRegistrationSuccess(username) {
        cy.get('h1.title').should('have.text', 'Welcome ' + username);
        cy.get('#rightPanel p').should('contain.text', 'Your account was created successfully. You are now logged in.');
    }
}

// Export the class so it can be used in test files
export default RegisterPage;