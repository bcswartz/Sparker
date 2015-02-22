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

})
