var AuthorizedPage = ( function() {
    //Define the DOM elements you want to test against as properties of the object
    this.salesMenu = element( by.className ( 'salesMenu' ) );
    this.accountingMenu = element( by.className ( 'accountingMenu' ) );
    this.authorizedMenu = element( by.className ( 'authorizedMenu' ) );
    this.logoutLink = element( by.id( 'logoutLink' ) );

    //Create a function for loading this page view into the browser
    this.get = function() {
        //Use setLocation:  if you use browser.get, you're essentially reloading the app and will lose authentication data.
        browser.setLocation( '/auth/authorized' );
    };

})

//Map the methods from the BasePageObject onto this one.
var BasePageObject = require( '../helpers/BasePageObject.js' );
AuthorizedPage.prototype = new BasePageObject();

module.exports = AuthorizedPage;