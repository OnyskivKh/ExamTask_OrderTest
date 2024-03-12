class SelectAddressPage {
    visit() {
        cy.log('Open Address page');
        cy.visit('/address/select');
    }
    getRadioButton(){
        return cy.get('span.mat-radio-container').first();
    }
    getContinueButton(){
        return cy.get('button[aria-label="Proceed to payment selection"]');
    }


}
export default new SelectAddressPage()