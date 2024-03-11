
class AddressPage {
    visit() {
        cy.log('Open Address page');
        cy.visit('/address/create');
    }
    getCountryField(){
        return cy.get('input#mat-input-3');
    }
    getNameField(){
        return cy.get('input#mat-input-4');
    }
    getPhoneField(){
        return cy.get('input#mat-input-5');
    }
    getZIPField(){
        return cy.get('input#mat-input-6');
    }
    getAddressField(){
        return cy.get('textarea#address');
    }
    getCityField(){
        return cy.get('input#mat-input-8');
    }
    getStateField(){
        return cy.get('input#mat-input-9');
    }
    getSubmitButton(){
        return cy.get('button#submitButton');
    }


}
export default new AddressPage()