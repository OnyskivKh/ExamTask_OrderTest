
class PaymentPage {
    visit() {
        cy.log('Open Payment page');
        cy.visit('/payment/shop');
    }
    getCardDropdown(){
        return cy.get('mat-expansion-panel-header#mat-expansion-panel-header-0');
    }
    getNameField(){
        return cy.get('div.mat-form-field-infix').eq(1);
    }
    getCardNumberField(){
        return cy.get('div.mat-form-field-infix').eq(2);

    }
    getExpiryMonthDropdown(){
        return cy.get('select#mat-input-12');
    }
    getExpiryYearDropdown(){
        return cy.get('select#mat-input-13');
    }
    getSubmitButton(){
        return cy.get('button#submitButton');
    }
    getConfirmationText(){
        return cy.get('span.mat-simple-snack-bar-content');
        //Your card ending with 5333 has been saved for your convenience.
    }
    getRadioButton(){
        return cy.get('mat-radio-button[id^="mat-radio-"]').first();
    }
    getContinueButton(){
        return cy.get('span.mat-button-wrapper span').last();
    }
    getPayForOrderButton(){
        return cy.get('button#checkoutButton');
    }
    getItemTitle(){
        return cy.get('mat-row mat-cell.mat-cell').eq(1);
    }
    getInformationAboutOrder(){
        return cy.get('a[routerlink="/track-result/new"]');
    }
}
export default new PaymentPage()
