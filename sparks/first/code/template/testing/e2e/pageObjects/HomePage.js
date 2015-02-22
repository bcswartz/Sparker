var HomePage = ( function() {
    //Define the DOM elements you want to test against as properties of the object
    this.title = element( by.id( 'homeTitle' ) );
    this.loginLink = element( by.id( 'loginLink' ) );
    this.logoutLink = element( by.id( 'logoutLink' ) );

    //Create a function for loading this page view into the browser
    this.get = function() {
        //Use setLocation:  if you use browser.get, you're essentially reloading the app and will lose any sort of session data.
        browser.setLocation( '/' );
    };

});

//Map the methods from the BasePageObject onto this one.
var BasePageObject = require( '../helpers/BasePageObject.js' );
HomePage.prototype = new BasePageObject();

module.exports = HomePage;