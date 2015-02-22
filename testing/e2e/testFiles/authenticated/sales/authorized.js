'use strict';

var AuthorizedPage = require( '../../../pageObjects/AuthorizedPage.js' );
var authorizedPage;

describe( 'Post-login landing view for Sales users', function() {

    // Any changes made within this set of tests need to be reset manually since the view will not be reloaded before each test
    var pageLoaded = false;
    beforeEach( function() {
        if( !pageLoaded ) {
            console.log( 'Loading the authorized page (for user with Sales role)' );
            authorizedPage = new AuthorizedPage();
            authorizedPage.get();
            pageLoaded = true;
        }
    });

    describe( 'when page loads', function() {

        it( 'expect the Sales menu item to be displayed', function() {
            expect( authorizedPage.salesMenu.isDisplayed() ).toBeTruthy();
        });

        it( 'expect the Accounting menu item to NOT be displayed', function() {
            expect( authorizedPage.accountingMenu.isDisplayed() ).toBeFalsy();
        });

        it( 'expect the Your Account menu item to be displayed', function() {
            expect( authorizedPage.authorizedMenu.isDisplayed() ).toBeTruthy();
        });

        it( 'expect the logout menu item to be displayed', function() {
            expect( authorizedPage.logoutLink.isDisplayed() ).toBeTruthy();
        });

    });

})