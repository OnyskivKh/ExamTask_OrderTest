import {itemSearchMainPage} from "../helper";

class OrderPage {
    constructor(){
        this.url = "/search"
        this.addToBascketButton = 'button[aria-label="Add to Basket"]'
    }
    visit() {
        cy.log('Open Shop page');
        cy.visit(this.url);
    }

    getMessageAboutItem(){
        return cy.get('span.mat-simple-snack-bar-content');
        //We are out of stock! Sorry for the inconvenience.
        //Added another OWASP Juice Shop Sticker Single to basket.
    }
    getSoldOutMark(){
        return cy.get('.ribbon span');
    }
    getUserEmail(){
        return cy.get('h1 small');
    }
    getProductName(){
        return cy.get('mat-cell.ng-star-inserted').eq(1);
    }
    getCheckoutButton(){
        return cy.get('button#checkoutButton');
    }
    getNewAddressButton(){
        return cy.get('button[aria-label="Add a new address"]');
    }
    getXButton(){
        return cy.get('button.mat-button-base').eq(8);
    }
    itemSearchMainPage(productName){
        cy.log('Find item');
        return cy.get('mat-card').then((cards) => {
            if (cards.find(`div.item-name:contains("${productName}")`).length > 0) {
                return cy.get(`div.item-name:contains("${productName}")`).then(() => {
                    cy.get(`img[alt="${productName}"]`).then(($img) => {
                        cy.wrap($img).parents('.mat-card').find(this.addToBascketButton).click();
                    });
                });
            } else {
                cy.get('button.mat-paginator-navigation-next').click({ force: true });
                return itemSearchMainPage(productName);
            }
        });
    }
}
export default new OrderPage()
