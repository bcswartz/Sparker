var AccountPage = ( function() {
	//Define the DOM elements you want to test against as properties of the object
	this.firstName = element( by.model ( 'vm.account.firstName' ) );
	this.lastName = element( by.model ( 'vm.account.lastName' ) );
    this.email = element( by.model ( 'vm.account.email' ) );
    this.submitButton = $("input[type='submit']");

    var errorBlocks = element.all( by.css( '.errorList' ) );
    this.firstNameErrors = errorBlocks.first();
    this.lastNameErrors = errorBlocks.get(1);
    this.emailErrors = errorBlocks.last();

    //Create a function for loading this page view into the browser
    this.get = function() {
        //Use setLocation:  if you use browser.get, you're essentially reloading the app and will lose authentication data.
        browser.setLocation( '/auth/userAccount' );
    };

	this.getFirstName = function() {
		return this.firstName.getAttribute( 'value' );
	}

	this.getLastName = function() {
		return this.lastName.getAttribute( 'value' );
	}

    this.getEmail = function() {
        return this.email.getAttribute( 'value' );
    }

});

//Map the methods from the BasePageObject onto this one.
var BasePageObject = require( '../helpers/BasePageObject.js' );
AccountPage.prototype = new BasePageObject();

module.exports = AccountPage;