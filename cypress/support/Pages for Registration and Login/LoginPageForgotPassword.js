import LoginPage from "./LoginPage";

class LoginPageForgotPassword {

    constructor() {
        this.url = '/forgot-password'
    }
    visit() {
        cy.log('Open authorization form');
        cy.visit(this.url);
    }
    getSecurityAnswerField() {
        return cy.get('#securityAnswer');
    }
    getNewPasswordField() {
        return cy.get('#newPassword');
    }
    getPasswordRepeatField() {
        return cy.get('#newPasswordRepeat');
    }
    getResetPasswordButton() {
        return cy.get('#resetButton');
    }
    getConfirmationText() {
        return cy.get('div.confirmation');
    }
}
export default new LoginPageForgotPassword()
