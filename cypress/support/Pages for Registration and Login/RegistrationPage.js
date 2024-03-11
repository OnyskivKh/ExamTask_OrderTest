class RegistrationPage {


    visit(){
        cy.visit('/register');
    }
    getEmailField() {
        return cy.get('#emailControl');
    }
    getPasswordField() {
        return cy.get('#passwordControl');
    }
    getConfirmedPasswordField() {
        return cy.get('#repeatPasswordControl');
    }
    getPasswordAdviceToggle() {
        return cy.get('span.mat-slide-toggle-bar');
    }
    getAdviceText() {
        return cy.get('input.mat-slide-toggle-input');
    }
    getSecurityQuestionDropdown() {
        return cy.get('mat-select[name="securityQuestion"]');
    }
    getDropdownOption() {
        return cy.get('.mat-option-text');
    }
    getSecurityAnswerField() {
        return cy.get('input#securityAnswerControl');
    }
    getRegisterButton() {
        return cy.get('button#registerButton');
    }
    getErrorMessage(){
        return cy.get('[id^="mat-error-"]');
    }
}
export default new RegistrationPage()