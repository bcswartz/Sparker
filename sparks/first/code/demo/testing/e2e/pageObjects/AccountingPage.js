var AccountingPage = ( function() {
    //Define the DOM elements you want to test against as properties of the object
    this.title = element( by.cssContainingText( 'h1', 'Top Client Accounts By Profit' ) );

    //Designate a pageIdentifier property to be used for the isPagePresent() function
    this.pageIdentifier = this.title;

    this.tableRows = element.all( by.repeater( 'client in vm.clients' ) );
    this.clientNames = element.all( by.repeater( 'client in vm.clients' ).column( 'name' ) );
    this.incomes = element.all( by.repeater( 'client in vm.clients' ).column( 'income' ) );
    this.expenses = element.all( by.repeater( 'client in vm.clients' ).column( 'expenditures' ) );
    this.profits = element.all( by.repeater( 'client in vm.clients' ).column( 'profit' ) );

    //Create a function for loading this page view into the browser
    this.get = function() {
        //Use setLocation:  if you use browser.get, you're essentially reloading the app and will lose any sort of session data.
        browser.setLocation( '/auth/accounting/accountingPage' );
    };

});

//Map the methods from the BasePageObject onto this one.
var BasePageObject = require( '../helpers/BasePageObject.js' );
AccountingPage.prototype = new BasePageObject();

module.exports = AccountingPage;