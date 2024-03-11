import orderPage from "../support/Pages for Order/OrderPage";
import popUpMessage from "../support/Pages for Registration and Login/PopUpMessage";
import mainPage from "../support/Pages for Registration and Login/MainPage";
import loginPage from "../support/Pages for Registration and Login/LoginPage";
import user from "../fixtures/user.json";
import contactPage from "../support/Page for Customer Feedback/ContactPage";
import {solveChangingCaptcha} from '../support/helper'

describe('Test Contact Page', () => {
   before('Go to Contact Page', () => {
        orderPage.visit();

        popUpMessage.closePopUp().click();
        popUpMessage.acceptCookies().click();

        mainPage.getAccountButton().click();
        mainPage.getLoginButton().click();

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
        solveChangingCaptcha();
        contactPage.getSubmitText().contains('Thank you for your feedback.');
    })
    });