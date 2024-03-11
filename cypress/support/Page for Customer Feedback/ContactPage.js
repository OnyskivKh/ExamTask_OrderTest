class ContactPage {

    constructor(){
        this.captchaQuestion = 'code#captcha'
        this.captchaField = 'input#captchaControl'
        this.submitButton = 'button#submitButton'
}
    visit() {
        cy.log('Open Contact page');
        cy.visit('/contact');
    }
    getAuthorField(){
        return cy.get('input#mat-input-3');
    }
    getCommentField(){
        return cy.get('textarea#comment');
    }
    getRatingSlider(){
        return cy.get('mat-slider#rating');
    }
    getCaptchaQuestion(){
        return cy.get(this.captchaQuestion);
    }
    getCaptchaField(){
        return cy.get(this.captchaField);
    }
    getSubmitButton(){
        return cy.get(this.submitButton);
    }
    getSubmitText(){
        return cy.get('div[aria-live="assertive"] span');
    }
}
export default new ContactPage()