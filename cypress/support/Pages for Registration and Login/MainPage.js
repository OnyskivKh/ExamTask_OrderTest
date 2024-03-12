class MainPage {

    constructor() {
        this.searchBar = 'mat-search-bar#searchQuery'
        this.searchBarInputField = 'input#mat-input-0'
        this.languageButton = '[aria-label="Language selection menu"]'
        this.goMainPageButton = '[aria-label="Back to homepage"]'
        this.sandwichMenu = '[aria-label="Open Sidenav"]'
        this.accountButton = '#navbarAccount'
        this.loginButton = '#navbarLoginButton'
        this.basketButton = '[aria-label="Show the shopping cart"]'
    }
    getAccountButton(){
        return cy.get(this.accountButton);
    }
    getLoginButton(){
        return cy.get(this.loginButton);
    }
    getNewCostumerButton(){
        return cy.get('#newCustomerLink');
    }
    getBasketButton(){
        return cy.get(this.basketButton);
    }
    getSearchBar(){
        return cy.get(this.searchBar)
    }
    getSearchBarInputField(){
        return cy.get(this.searchBarInputField)
    }
    getSandwichMenu(){
       return cy.get (this.sandwichMenu)
    }
    getCustomerFeedbackButton(){
        return cy.get ('a[aria-label="Go to contact us page"]')
    }
}
export default new MainPage()


