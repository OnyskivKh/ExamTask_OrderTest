import orderPage from "../support/Pages for Order/OrderPage";
import popUpMessage from "../support/Pages for Registration and Login/PopUpMessage";
import mainPage from "../support/Pages for Registration and Login/MainPage";
import loginPage from "../support/Pages for Registration and Login/LoginPage";
import user from "../fixtures/user.json";
import contactPage from "../support/Page for Customer Feedback/ContactPage";
import {solveCaptcha} from '../support/helper'
import registrationPage from "../support/Pages for Registration and Login/RegistrationPage";

describe('Test Contact Page', () => {
   before('Go to Contact Page', () => {
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

               cy.log('Open Login page');
               loginPage.visit();

               loginPage.fillLoginFields(user.email, user.password);
               loginPage.getLoginButton().click();

               mainPage.getSandwichMenu().click();
               mainPage.getCustomerFeedbackButton().click();

   });

    it('Write Feedback', () => {
        contactPage.visit();

        contactPage.getAuthorField().should('exist').and('be.disabled');
        contactPage.getCommentField().type(user.comment);
        contactPage.getRatingSlider().invoke('val', 4).trigger('input').type('{rightarrow}');
        contactPage.getRatingSlider().should('have.attr', 'aria-valuenow', "4");
        solveCaptcha();
        contactPage.getSubmitText().contains('Thank you for your feedback.');
    })
    });