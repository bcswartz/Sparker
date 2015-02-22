var SalesPage = ( function() {
    this.title = element( by.cssContainingText( 'h1', 'Sales Prospects' ) );

    //Designate a pageIdentifier property to be used for the isPagePresent() function
    this.pageIdentifier = this.title;

    //The by.repeater selector is useful for grabbing the collection of DOM elements generated by ng-repeat
    this.tableRows = element.all( by.repeater( 'prospect in vm.prospects' ) );

    //...and you can use the row and column (property in repeated object) retrieval to return the DOM element(s) enclosing a data binding
    this.fullNames = element.all( by.repeater( 'prospect in vm.prospects').column( 'fullName' ) );
    this.phoneNumbers = element.all( by.repeater( 'prospect in vm.prospects').column( 'phone' ) );
    this.emailAddresses = element.all( by.repeater( 'prospect in vm.prospects').column( 'email' ) );

    //...but when the repeated data is stored within the attribute of a DOM element, you're better off using CSS selectors, it seems
    this.prospectLinks =  $$('tr a');

    //Create a function for loading this page view into the browser
    this.get = function() {
        //Use setLocation:  if you use browser.get, you're essentially reloading the app and will lose any sort of session data.
        browser.setLocation( '/auth/sales/salesPage' );
    };

    this.getFullNameByIndex = function( index ) {
        return this.fullNames.get(index).getText();
    };

});

//Map the methods from the BasePageObject onto this one.
var BasePageObject = require( '../helpers/BasePageObject.js' );
SalesPage.prototype = new BasePageObject();

module.exports = SalesPage;