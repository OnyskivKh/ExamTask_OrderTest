
class AddressPage {
    visit() {
        cy.log('Open Address page');
        cy.visit('/address/create');
    }
    getCountryField(){
        return cy.get('input[id^="mat-input-"]').eq(1);
    }
    getNameField(){
        return cy.get('input[id^="mat-input-"]').eq(2);
    }
    getPhoneField(){
        return cy.get('input[id^="mat-input-"]').eq(3);
    }
    getZIPField(){
        return cy.get('input[id^="mat-input-"]').eq(4);
    }
    getAddressField(){
        return cy.get('textarea#address');
    }
    getCityField(){
        return cy.get('input[id^="mat-input-"]').eq(5);
    }
    getStateField(){
        return cy.get('input[id^="mat-input-"]').eq(6);
    }
    getSubmitButton(){
        return cy.get('button#submitButton');
    }


}
export default new AddressPage()