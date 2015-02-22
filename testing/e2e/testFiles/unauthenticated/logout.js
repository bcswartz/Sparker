'use strict';

var LoginPage = require( '../../pageObjects/LoginPage.js' );
var AuthorizedPage = require( '../../pageObjects/AuthorizedPage.js' );
var HomePage = require( '../../pageObjects/HomePage.js' );
var loginPage;
var authorizedPage;
var homePage;

describe( 'Logout test', function() {
    var pageLoaded = false;
    beforeEach( function() {
        if( !pageLoaded ) {
            console.log( 'Loading resources to test logout' );
            loginPage = new LoginPage();
            authorizedPage = new AuthorizedPage();
            homePage = new HomePage();
            loginPage.get();

            loginPage.setInputValue( 'username', 'salesGuy' );
            loginPage.setInputValue( 'password', 'Password1' );
            loginPage.clickElement( 'submitButton' );

            pageLoaded = true;
        }
    });

    describe( 'verify that test starts on authorized page', function() {
        it( 'expect the Your Account menu item to be displayed', function() {
            expect( authorizedPage.authorizedMenu.isDisplayed() ).toBeTruthy();
        });

        it( 'expect the logout menu item to be displayed', function() {
            expect( authorizedPage.logoutLink.isDisplayed() ).toBeTruthy();
        });
    });

    describe( 'when logout link clicked', function() {
        it( 'should navigate to home page, display login link, and remove Your Account menu item', function() {
           authorizedPage.clickElement( "logoutLink" );
           expect( authorizedPage.authorizedMenu.isDisplayed() ).toBeFalsy();
           expect( homePage.title.isDisplayed() ).toBeTruthy();
           expect( homePage.loginLink.isDisplayed() ).toBeTruthy();
        })
    })

});