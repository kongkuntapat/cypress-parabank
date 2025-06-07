import LoginPage from '../pages/LoginPage';
import AccountPage from '../pages/AccountPage';

describe('Login and Logout Feature', () => {

    beforeEach(() => {
        cy.fixture('created_user').as('createdUser');
        cy.fixture('user_data').as('userData');
    });

    it('should display an error message for invalid credentials', () => {
        const loginPage = new LoginPage();
        loginPage.visit();
        loginPage.fillUsername('invalidUser');
        loginPage.fillPassword('invalidPassword');
        loginPage.submit();
        loginPage.verifyLoginFailed();

        // --- บรรทัดที่เพิ่มเข้ามา ---
        cy.log('Test completed').should('exist');
    });

    it('should allow a registered user to log in and log out successfully', function() {
        const accountPage = new AccountPage();
        
        cy.login(this.createdUser.username, this.createdUser.password);
        cy.visit('/overview.htm');

        accountPage.verifyAccountServices();

        const fullName = `${this.userData.firstName} ${this.userData.lastName}`;
        accountPage.verifyWelcomeMessage(fullName);

        accountPage.clickLogout();
        cy.get('a[href*="register.htm"]').should('be.visible');

        // --- บรรทัดที่เพิ่มเข้ามา ---
        cy.log('Test completed').should('exist');
    });
});