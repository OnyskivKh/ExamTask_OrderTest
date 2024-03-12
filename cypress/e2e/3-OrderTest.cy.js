import {confirmationOfID} from "../support/helper.js"
import orderPage from '../support/Pages for Order/OrderPage'
import mainPage from "../support/Pages for Registration and Login/MainPage";
import popUpMessage from "../support/Pages for Registration and Login/PopUpMessage";
import loginPage from "../support/Pages for Registration and Login/LoginPage";
import user from "../fixtures/user.json";
import addressPage from "../support/Pages for Order/AddressFormPage"
import selectAddressPage from "../support/Pages for Order/SelectAddressPage";
import deliveryPage from "../support/Pages for Order/DeliveryPage";
import paymentPage from "../support/Pages for Order/PaymentPage";
import registrationPage from "../support/Pages for Registration and Login/RegistrationPage";
describe('Search for item', () => {
    beforeEach('Registration ', () => {
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

        loginPage.visit();

        loginPage.fillLoginFields(user.email, user.password);
        loginPage.getLoginButton().click();

        cy.log('Redirection to the Main Page and Basket should appear');
        mainPage.getBasketButton('contain', 'Your Basket');
        });

    it('Search for existed item', () => {
        orderPage.visit();

        mainPage.getSearchBar().type('Sticker');
        mainPage.getSearchBarInputField().type("{enter}");
        orderPage.itemSearchMainPage('OWASP Juice Shop Sticker Single').then(() => {
                orderPage.getMessageAboutItem().contains('OWASP Juice Shop Sticker Single')
                orderPage.getXButton().click();
                mainPage.getBasketButton().click();
                orderPage.getUserEmail().contains(user.email);
                orderPage.getProductName().contains('OWASP Juice Shop Sticker Single');
                orderPage.getCheckoutButton().click();
                orderPage.getNewAddressButton().click();

                cy.log('Fill in Address Form');
                addressPage.visit();
                addressPage.getSubmitButton().should('exist').and('be.disabled');
                addressPage.getCountryField().type(user.country).should('have.value', user.country);
                addressPage.getNameField().type(user.name).should('have.value', user.name);
                addressPage.getPhoneField().type(user["phone number"]).should('have.value', user["phone number"]);
                addressPage.getZIPField().type(user.zip).should('have.value', user.zip);
                addressPage.getAddressField().type(user.address).should('have.value', user.address);
                addressPage.getCityField().type(user.city).should('have.value', user.city);
                addressPage.getStateField().type(user.state).should('have.value', user.state);
                addressPage.getSubmitButton().click().should('exist').and('not.be.disabled');
                });

               cy.log('Go to selection of Address');
               selectAddressPage.getRadioButton().click();
               selectAddressPage.getContinueButton().click();

               cy.log('Go to Delivery page');
               deliveryPage.getDeliveryInfo().contains(user.country);
               deliveryPage.getRadioButton().click({force:true});
               deliveryPage.getContinueButton().click();

               cy.log('Go to Payment page');
               paymentPage.getCardDropdown().should('have.attr','aria-expanded', 'false');
               paymentPage.getCardDropdown().click().should('have.attr','aria-expanded', 'true');
               paymentPage.getNameField().type(user.name);
               paymentPage.getCardNumberField().type(user["card number"]);
               paymentPage.getExpiryMonthDropdown().select(user.month);
               paymentPage.getExpiryYearDropdown().select(user.year);
               paymentPage.getSubmitButton().click();
               paymentPage.getConfirmationText().contains('Your card ending with');
               paymentPage.getRadioButton().click();
               paymentPage.getContinueButton().click();

               cy.log('Go to Final Payment page');
               paymentPage.getItemTitle().contains(' OWASP Juice Shop Sticker Single ');
               paymentPage.getPayForOrderButton().click();

               cy.log('Go to Final Payment page');
               paymentPage.getInformationAboutOrder().click();
               confirmationOfID();
    });

    it('Search for sold out item', () => {
        orderPage.visit();

        mainPage.getSearchBar().type('Sticker');
        mainPage.getSearchBarInputField().type("{enter}");
        orderPage.itemSearchMainPage('OWASP Juice Shop Holographic Sticker')
        orderPage.getMessageAboutItem().contains('We are out of stock! Sorry for the inconvenience.');
        orderPage.getSoldOutMark().contains('Sold Out');
        });

})