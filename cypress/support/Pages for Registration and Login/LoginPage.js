import user from '../../fixtures/user.json'
import mainPage from "./MainPage";
class LoginPage {

    constructor(){
            this.url = "/login"
            this.loginEmailField = 'input#email'
            this.passwordField = 'input#password'
            this.loginButton = 'button#loginButton'
    }
    visit() {
        cy.log('Open authorization form');
        cy.visit(this.url);
    }
    getLoginEmailField() {
        return cy.get(this.loginEmailField);
    }
    getLoginPasswordField() {
        return cy.get(this.passwordField);
    }
    getEyeButton() {
        return cy.get('[aria-label="Eye"]');
    }
    getForgotPasswordButton() {
        return cy.get('mat-form-field.mat-form-field').eq(2);
    }
    getLoginButton() {
        return cy.get(this.loginButton);
    }
    getRememberMeCheckbox() {
        return cy.get('span.mat-checkbox-inner-container').first();
    }
    geErrorMessage() {
        return cy.get('div.error');
    }
    fillLoginFields(email = '', password = '') {
        cy.log('Fill in authorization fields');
        email ?  this.getLoginEmailField().type(email) : cy.log('Skip username field');
        password ?  this.getLoginPasswordField().type(password) : cy.log('Skip password field');
    }
}
export default new LoginPage()
