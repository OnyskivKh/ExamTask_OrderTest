import {faker} from "@faker-js/faker";
import user from '../fixtures/user.json'
import registrationPage from '../support/Pages for Registration and Login/RegistrationPage'
import popUpMessage from "../support/Pages for Registration and Login/PopUpMessage";
import mainPage from "../support/Pages for Registration and Login/MainPage";
import loginPage from "../support/Pages for Registration and Login/LoginPage";

user.email = faker.internet.email();
user.password = faker.internet.password();

describe('Registration', () => {
   it('Fill in form and verify registration success', () => {
   cy.log('Open Main page');
   cy.visit('/');

   popUpMessage.closePopUp().click();
   popUpMessage.acceptCookies().click();
   mainPage.getAccountButton().click();
   mainPage.getLoginButton().click();
   mainPage.getNewCostumerButton().click();

    cy.log('Open Registration page');
    registrationPage.visit();

    cy.log('Check for Error message when required field left empty');
    registrationPage.getEmailField().click();
    registrationPage.getPasswordField().click();
    registrationPage.getErrorMessage('contain', 'Please');

    cy.log('Fill in the Registration form');
    registrationPage.getEmailField().type(user.email).should('have.value', user.email);
    registrationPage.getPasswordField().type(user.password).should('have.value', user.password);
    registrationPage.getConfirmedPasswordField().type(user.password).should('have.value', user.password);
    registrationPage.getAdviceText().should('have.attr', 'aria-checked', 'false');
    registrationPage.getPasswordAdviceToggle().click();
    registrationPage.getAdviceText().should('have.attr', 'aria-checked', 'true');
    registrationPage.getSecurityQuestionDropdown().click();
    registrationPage.getDropdownOption().contains('Name of your favorite pet?').click();
    registrationPage.getRegisterButton().should('exist').and('be.disabled');
    registrationPage.getSecurityAnswerField().type(`${user["security question"]}`);
    registrationPage.getRegisterButton().should('exist').and('not.be.disabled');
    registrationPage.getRegisterButton().click();

    })
    it('Login page', () => {
        loginPage.visit();
        popUpMessage.closePopUp().click();
        popUpMessage.acceptCookies().click();

        loginPage.fillLoginFields(user.email, user.password);
        loginPage.getLoginButton().click();

        cy.log('Redirection to the Main Page and Basket should appear');
        mainPage.getBasketButton('contain', ' Your Basket');
    });
})
