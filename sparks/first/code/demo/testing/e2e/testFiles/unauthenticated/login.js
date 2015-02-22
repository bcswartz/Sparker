'use strict';

var LoginPage = require( '../../pageObjects/LoginPage.js' );
var loginPage;

describe( 'actions within view', function() {

    // Any changes made within this set of tests need to be reset manually since the view will not be reloaded before each test
    var pageLoaded = false;
    beforeEach( function() {
        if( !pageLoaded ) {
            console.log( 'Loading the login page' );
            loginPage = new LoginPage();
            loginPage.get();
            pageLoaded = true;
        }
    });

    describe( 'in initial state', function() {

        it( 'should have the username field empty', function() {
            expect( loginPage.getUsername() ).toEqual( '' );
        });

        it( 'should have the password field populated', function() {
            expect( loginPage.getPassword() ).toEqual( '' );
        });

        it( 'should have the errorList hidden', function() {
            expect( loginPage.errorList.isDisplayed() ).toBeFalsy();
        });

    });

    describe( 'when submit button is clicked', function() {
        it( 'should display an error if the username and password are blank', function() {
            loginPage.setInputValue( 'username', '' );
            loginPage.setInputValue( 'password', '' );
            loginPage.clickElement( 'submitButton' );
            expect( loginPage.errorList.isDisplayed() ).toBeTruthy();

        })

        it( 'should display an error if the username and password are invalid credentials', function() {
            //Refresh the page to clear the error from the previous test.
            loginPage.refreshPage();
            loginPage.setInputValue( 'username', 'Nobody' );
            loginPage.setInputValue( 'password', 'Bogus' );
            loginPage.clickElement( 'submitButton' );
            expect( loginPage.errorList.isDisplayed() ).toBeTruthy();
        })

    })
})
