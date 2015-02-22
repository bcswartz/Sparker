'use strict';

var LoginPage = require( '../../pageObjects/LoginPage.js' );
var HomePage = require( '../../pageObjects/HomePage.js' );
var loginPage;
var homePage;

describe( 'Logout test', function() {
    var pageLoaded = false;
    beforeEach( function() {
        if( !pageLoaded ) {
            console.log( 'Loading resources to test logout' );
            loginPage = new LoginPage();
            homePage = new HomePage();
            loginPage.get();

            //spark-comment: TODO Provide valid user credentials to login with
            loginPage.setInputValue( 'username', '' );
            loginPage.setInputValue( 'password', '' );
            loginPage.clickElement( 'submitButton' );

            pageLoaded = true;
        }
    });

    /*describe( 'when logout link clicked', function() {
        it( 'should navigate to home page and display login link', function() {
           expect( homePage.logoutLink.isDisplayed() ).toBeTruthy();
           homePage.clickElement( "logoutLink" );
           expect( homePage.title.isDisplayed() ).toBeTruthy();
           expect( homePage.loginLink.isDisplayed() ).toBeTruthy();
        })
    })*/

});