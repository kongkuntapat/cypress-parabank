// นำเข้า Class ของ Page Object ที่เราสร้างไว้
import RegisterPage from '../pages/RegisterPage';

describe('User Registration Feature', () => {

    beforeEach(() => {
        cy.fixture('user_data').as('userData');
    });

    it('should allow a new user to register successfully', function() {
        const registerPage = new RegisterPage();

        const randomString = Math.random().toString(36).substring(2, 10);
        const uniqueUsername = `testuser${randomString}`;
        const uniqueSsn = Date.now().toString().slice(-9);

        registerPage.visit();

        registerPage.fillFirstName(this.userData.firstName);
        registerPage.fillLastName(this.userData.lastName);
        registerPage.fillAddress(this.userData.address);
        registerPage.fillCity(this.userData.city);
        registerPage.fillState(this.userData.state);
        registerPage.fillZipCode(this.userData.zipCode);
        registerPage.fillPhoneNumber(this.userData.phoneNumber);
        registerPage.fillSsn(uniqueSsn);
        registerPage.fillUsername(uniqueUsername);
        registerPage.fillPassword(this.userData.password);
        registerPage.fillConfirmPassword(this.userData.password);
        
        registerPage.submitRegistration();

        registerPage.verifyRegistrationSuccess(uniqueUsername);

        cy.writeFile('cypress/fixtures/created_user.json', { 
            username: uniqueUsername, 
            password: this.userData.password 
        });
    });

});