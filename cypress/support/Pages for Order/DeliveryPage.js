class DeliveryPage {
    visit() {
        cy.log('Open Address page');
        cy.visit('/delivery-method');
    }
    getDeliveryInfo(){
        return cy.get('div.addressCont');
    }
    getRadioButton(){
        return cy.get('span.mat-radio-outer-circle').first();
    }
    getContinueButton(){
        return cy.get('button[aria-label="Proceed to delivery method selection"]').first();
    }

}
export default new DeliveryPage()