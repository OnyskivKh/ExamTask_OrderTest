import user from '../fixtures/user.json'
import loginPage from "./Pages for Registration and Login/LoginPage";
import {faker} from "@faker-js/faker";
import contactPage from "./Page for Customer Feedback/ContactPage";
export function fillLoginField(email = '', password = '') {
    cy.log('Fill in Login fields');
   email ? cy.get('input#email').type(user.email) : cy.log('username fields not filled');
   password ? cy.get('input#password').type(user.password) : cy.log('password fields not filled');
}


export function itemSearchMainPage(productName) {
    cy.log('Find item');
    return cy.get('mat-card').then((cards) => {
        if (cards.find(`div.item-name:contains("${productName}")`).length > 0) {
            return cy.get(`div.item-name:contains("${productName}")`).then(() => {
                cy.get(`img[alt="${productName}"]`).then(($img) => {
                    cy.wrap($img).parents('.mat-card').find('button[aria-label="Add to Basket"]').click();
                });
            });
        } else {
            cy.get('button.mat-paginator-navigation-next').click({ force: true });
            return itemSearchMainPage(productName);
        }
    });
}
export function confirmationOfID() {
    cy.log('Check ID in URL and page');
    cy.url().then(url => {
        const urlId = getUrlIdFromUrl(url);
        if (!urlId) {
            cy.log('No ID found in the URL. Skipping confirmation.');
            return;
        }
        const urlWithId = `#/track-result/new?id=${urlId}`;
        cy.get('span code', { timeout: 10000 }).should('be.visible').then($code => {
            const displayedId = $code.text().trim();
            expect(displayedId).to.equal(urlId);
        });
    });
}
function getUrlIdFromUrl(url) {
    const params = url.split(/[?&]/);
    for (const param of params) {
        if (param.startsWith('id=')) {
            return param.substring(3);
        }
    }
    return null;
}

export function solveChangingCaptcha(){
contactPage.getCaptchaQuestion().then($input => {
    const captchaText = $input.text();
    const numbersAndOperators = captchaText.match(/-?\d+|[+*/-]/g);

    let answer = parseInt(numbersAndOperators[0]);
    let currentOperator = null;

    for (let i = 1; i < numbersAndOperators.length; i++) {
        const currentItem = numbersAndOperators[i];
        if (['*', '/'].includes(currentItem)) {
            currentOperator = currentItem;
        } else if (currentItem === '+' || currentItem === '-') {
            currentOperator = currentItem;
        } else {
            const operand = parseInt(currentItem);
            if (currentOperator === '*') {
                answer *= operand;
            } else if (currentOperator === '/') {
                answer /= operand;
            } else if (currentOperator === '+') {
                answer += operand;
            } else if (currentOperator === '-') {
                answer -= operand;
            }
        }
    }

    contactPage.getCaptchaField().type(answer);
    contactPage.getSubmitButton().click();
})
}




