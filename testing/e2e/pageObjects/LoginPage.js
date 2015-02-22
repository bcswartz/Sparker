
var LoginPage = ( function() {

    //Define the DOM elements you want to test against as properties of the object.
    this.username = element( by.model ( 'vm.userLogin.username' ) );
    this.password = element( by.model ( 'vm.userLogin.password' ) );
    this.submitButton = element( by.id ( 'loginSubmitBtn' ) );
    this.errorList = element( by.className ( 'errorList' ) );

    //Create a function for loading this page view into the browser
    this.get = function() {
        //Use setLocation:  if you use browser.get, you're essentially reloading the app and will lose authentication data.
        browser.setLocation( '/login' );
    };

    //Create functions to interrogate the state of the DOM elements
    this.getUsername = function() {
        return this.username.getAttribute( 'value' );
    }

    this.getPassword = function() {
        return this.password.getAttribute( 'value' );
    }

});

//Map the methods from the BasePageObject onto this one.
var BasePageObject = require( '../helpers/BasePageObject.js' );
LoginPage.prototype = new BasePageObject();

module.exports = LoginPage;