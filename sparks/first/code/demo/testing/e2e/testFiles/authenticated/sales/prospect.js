'use strict';

var ProspectPage = require( '../../../pageObjects/ProspectPage.js' );
var SalesPage = require( '../../../pageObjects/SalesPage.js' );
var prospectPage;
var salesPage;

describe( 'Prospect detail view', function() {
    // Any changes made within this set of tests need to be reset manually since the view will not be reloaded before each test
    var pageLoaded = false;
    beforeEach(function () {
        if (!pageLoaded) {
            console.log( 'Loading the prospect detail page' );
            prospectPage = new ProspectPage();
            salesPage = new SalesPage();
            prospectPage.get();
            pageLoaded = true;
        }
    });

    describe( 'on page load', function() {

        it( 'should display the expected title', function () {
            expect( prospectPage.title.getText() ).toEqual( "Prospect Details" );
        });

        it( 'should display the expected data bindings', function () {
            expect( prospectPage.fullName.isPresent() ).toBeTruthy();
            expect( prospectPage.phoneNumber.isPresent() ).toBeTruthy();
            expect( prospectPage.emailAddress.isPresent() ).toBeTruthy();
            expect( prospectPage.mailingAddress.isPresent() ).toBeTruthy();
        });

    });

    describe( 'when clicking the Back link', function() {
        it( 'should return to the Sales view', function() {
            prospectPage.clickElement( 'backLink' );
            expect( salesPage.isPagePresent() ).toEqual( true );
        })
    })
});