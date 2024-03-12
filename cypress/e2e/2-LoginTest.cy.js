import {faker} from "@faker-js/faker";
import user from '../fixtures/user.json'
import registrationPage from '../support/Pages for Registration and Login/RegistrationPage'
import popUpMessage from "../support/Pages for Registration and Login/PopUpMessage";
import mainPage from "../support/Pages for Registration and Login/MainPage";
import loginPage from "../support/Pages for Registration and Login/LoginPage";
import loginPageForgotPassword from "../support/Pages for Registration and Login/LoginPageForgotPassword";

describe('Login positive scenario', () => {
    before('Registration', () => {
        cy.visit('/');

        popUpMessage.closePopUp().click();
        popUpMessage.acceptCookies().click();
        mainPage.getAccountButton().click();
        mainPage.getLoginButton().click();
        mainPage.getNewCostumerButton().click();

        cy.log('Open Registration page');
        registrationPage.visit();

        registrationPage.getEmailField().type(user.email).should('have.value', user.email);
        registrationPage.getPasswordField().type(user.password).should('have.value', user.password);
        registrationPage.getConfirmedPasswordField().type(user.password).should('have.value', user.password);
        registrationPage.getSecurityQuestionDropdown().click();
        registrationPage.getDropdownOption().contains('Name of your favorite pet?').click();
        registrationPage.getSecurityAnswerField().type(`${user["security question"]}`);
        registrationPage.getRegisterButton().click();
    })

    it('Login page', () => {
        loginPage.visit();

        loginPage.getLoginButton().should('exist').and('be.disabled');
        loginPage.fillLoginFields(user.email, user.password);
        loginPage.getEyeButton().click();
        loginPage.getRememberMeCheckbox().click();
        loginPage.getLoginButton().click();
        loginPage.getLoginButton().should('exist').and('not.be.disabled');

        cy.log('Redirection to the Main Page and Basket should appear');
        mainPage.getBasketButton('contain', ' Your Basket');
})
})

describe('Login negative scenarios', () => {
    it('Login without entering email', () => {
        cy.log('Open Login form');
        loginPage.visit();

        cy.log('Close pop up window');
        popUpMessage.closePopUp().click();
        popUpMessage.acceptCookies().click();

        loginPage.fillLoginFields(user.email);
        loginPage.getLoginButton().should('exist').and('be.disabled');
        loginPage.getLoginButton().click({force:true});

        cy.log('Error message should appear below the blank field');
        loginPage.geErrorMessage('contain', 'Invalid email or password.');

    })
    it('Login without entering password', () => {
        cy.log('Open Login form');
        loginPage.visit();

        cy.log('Close pop up window');
        popUpMessage.closePopUp().click();
        popUpMessage.acceptCookies().click();

        loginPage.fillLoginFields(user.password);
        loginPage.getLoginButton().should('exist').and('be.disabled');
        loginPage.getLoginButton().click({force:true});

        cy.log('Error message should appear below the blank field');
        loginPage.geErrorMessage('contain', 'Invalid email or password.');

    })
    it('Login without entering email and password', () => {
        cy.log('Open Login form');
        loginPage.visit();

        cy.log('Close pop up window');
        popUpMessage.closePopUp().click();
        popUpMessage.acceptCookies().click();

        loginPage.fillLoginFields();
        loginPage.getLoginButton().should('exist').and('be.disabled');
        loginPage.getLoginButton().click({force:true});

        cy.log('Error message should appear below the blank field');
        loginPage.geErrorMessage('contain', 'Invalid email or password.');
    })
})

describe.skip('Login with "Forgot password"', () => {
    it('Enter Change Password page', () => {
        cy.log('Open Change Password form');
        loginPage.visit();

        cy.log('Close pop up window');
        popUpMessage.closePopUp().click();
        popUpMessage.acceptCookies().click();

        loginPage.fillLoginFields(user.email);
        loginPage.getLoginButton().should('exist').and('be.disabled');
        loginPage.getLoginButton().click({force:true});

        cy.log('Error message should appear below the blank field');
        loginPage.geErrorMessage('contain', 'Invalid email or password.');

        cy.log('Click "Forgot your password" button');
        loginPage.getForgotPasswordButton().click();

        loginPageForgotPassword.visit();
        loginPage.fillLoginFields(user.email);
        loginPageForgotPassword.getSecurityAnswerField().type(`${user["security question"]}`)
        loginPageForgotPassword.getNewPasswordField().type(user["new password"]);
        loginPageForgotPassword.getPasswordRepeatField().type(user["new password"]);
        registrationPage.getPasswordAdviceToggle().click();
        registrationPage.getAdviceText().should('have.attr', 'aria-checked', 'true');
        loginPageForgotPassword.getResetPasswordButton().click();
        loginPageForgotPassword.getConfirmationText('contains', 'Your password was successfully changed.')
})
})
