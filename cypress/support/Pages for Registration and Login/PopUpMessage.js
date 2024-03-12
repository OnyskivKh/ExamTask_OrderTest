class PopUpMessage {

    closePopUp() {
        return cy.get('.mat-button-wrapper')
            .find('span')
            .eq(4)
            .should('have.text', 'Dismiss');
    }
    acceptCookies() {
         return cy.get('.cc-btn')
}
}
export default new PopUpMessage()


