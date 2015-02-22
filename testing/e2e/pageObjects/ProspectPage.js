var ProspectPage = ( function() {
    //Define the DOM elements you want to test against as properties of the object
    this.title = element( by.cssContainingText( 'h2', 'Prospect Details' ) );

    //Designate a pageIdentifier property to be used for the isPagePresent() function
    this.pageIdentifier = this.title;

    this.fullName = element( by.binding( 'vm.prospect.fullName' ) );
    this.phoneNumber = element( by.binding( 'vm.prospect.phone' ) );
    this.emailAddress = element( by.binding( 'vm.prospect.email' ) );
    this.mailingAddress = element( by.binding( 'vm.prospect.address' ) );

    this.backLink = element( by.css( 'span.glyphicon-chevron-left' ) );

    //Create a function for loading this page view into the browser
    this.get = function() {
        //Use setLocation:  if you use browser.get, you're essentially reloading the app and will lose any sort of session data.
        browser.setLocation( '/auth/sales/prospect/2' );
    };

});

//Map the methods from the BasePageObject onto this one.
var BasePageObject = require( '../helpers/BasePageObject.js' );
ProspectPage.prototype = new BasePageObject();

module.exports = ProspectPage;