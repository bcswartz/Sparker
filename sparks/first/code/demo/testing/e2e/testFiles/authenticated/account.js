'use strict';

var AccountPage = require( '../../pageObjects/AccountPage.js' );
var accountPage;


describe( 'User account view', function() {

	// Any changes made within this set of tests need to be reset manually since the view will not be reloaded before each test
	var pageLoaded = false;
	beforeEach( function() {
		if( !pageLoaded ) {
			console.log( 'Loading the (authenticated) account page' );
            accountPage = new AccountPage();
            accountPage.get();
			pageLoaded = true;
		}
	});

	describe( 'on page load', function() {

	    it( 'should have the first name field populated', function() {
			expect( accountPage.getFirstName() ).toEqual( browser.params.user.firstName );
		});

		it( 'should have the last name field populated', function() {
			expect( accountPage.getLastName() ).toEqual( browser.params.user.lastName );
		});

        it( 'should have the email field populated', function() {
            expect( accountPage.getEmail() ).toEqual( browser.params.user.email );
        });

	})

    describe( 'form submission', function() {

        it( 'should show error message if first name is blank', function() {
            expect( accountPage.firstNameErrors.isDisplayed() ).toBeFalsy();
            accountPage.setInputValue( 'firstName', '' );
            accountPage.clickElement( 'submitButton' );
            expect( accountPage.firstNameErrors.isDisplayed() ).toBeTruthy();
        })

        it( 'should show error message if last name is blank', function() {
            browser.setLocation( '/auth/authorized' );
            browser.setLocation( '/auth/userAccount' );
            expect( accountPage.lastNameErrors.isDisplayed() ).toBeFalsy();
            accountPage.setInputValue( 'lastName', '' );
            accountPage.clickElement( 'submitButton' );
            expect( accountPage.lastNameErrors.isDisplayed() ).toBeTruthy();
        })

        it( 'should show error message if email is blank', function() {
            browser.setLocation( '/auth/authorized' );
            browser.setLocation( '/auth/userAccount' );
            expect( accountPage.emailErrors.isDisplayed() ).toBeFalsy();
            accountPage.setInputValue( 'email', '' );
            accountPage.clickElement( 'submitButton' );
            expect( accountPage.emailErrors.isDisplayed() ).toBeTruthy();
        })

        it( 'should show error message if email is invalid', function() {
            browser.setLocation( '/auth/authorized' );
            browser.setLocation( '/auth/userAccount' );
            expect( accountPage.emailErrors.isDisplayed() ).toBeFalsy();
            accountPage.setInputValue( 'email', 'foo' );
            accountPage.clickElement( 'submitButton' );
            expect( accountPage.emailErrors.isDisplayed() ).toBeTruthy();
        })
    })
})
