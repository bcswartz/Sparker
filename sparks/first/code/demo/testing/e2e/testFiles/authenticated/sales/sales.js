'use strict';

var SalesPage = require( '../../../pageObjects/SalesPage.js' );
var ProspectPage = require( '../../../pageObjects/ProspectPage.js' );
var salesPage;
var prospectPage;

describe( 'Sale prospects view', function() {
    // Any changes made within this set of tests need to be reset manually since the view will not be reloaded before each test
    var pageLoaded = false;
    beforeEach( function() {
        if( !pageLoaded ) {
            console.log( 'Loading the sales page' );
            salesPage = new SalesPage();
            prospectPage = new ProspectPage();
            salesPage.get();
            pageLoaded = true;
        }
    });

    describe( 'on page load', function() {

        it( 'should display the expected title', function() {
            expect( salesPage.title.getText()).toEqual( 'Sales Prospects' );
        });

        it( 'should display all rows of data with expected data bindings', function() {
            expect( salesPage.tableRows.count() ).toEqual(6);
            expect( salesPage.fullNames.count() ).toEqual(6);
            expect( salesPage.phoneNumbers.count() ).toEqual(6);
            expect( salesPage.emailAddresses.count() ).toEqual(6);
        });

        it( 'should have "Lost Authentication" as the first name in the table', function() {
            expect( salesPage.getFullNameByIndex( 0 )).toEqual( 'Lost Authentication' );
        });

        it( 'should generate detail view links for the prospects', function() {
            var linkRegEx = /(\/auth\/sales\/prospect\/)\d{1}$/;

            // Need to get the link string in order to perform a regex test on it, so resolve the promise
            // (Protractor decorates Jasmine to resolve promises inside expect statements.
            salesPage.prospectLinks.get( 0 ).getAttribute( 'href' ).then( function(  hrefValue ) {
                expect( linkRegEx.test( hrefValue ) ).toBeTruthy();
            });
        });

        it( 'should display the rows by prospectId in ascending order', function() {
            var splitRegEx = /(\/prospect\/)/;

            // Comparing the results of multiple promises can require nesting to make sure all promises are resolved
            salesPage.prospectLinks.get( 0 ).getAttribute( 'href' ).then( function(  hrefValueA ) {
                salesPage.prospectLinks.get( 1 ).getAttribute( 'href' ).then( function(  hrefValueB ) {
                    salesPage.prospectLinks.get( 2 ).getAttribute( 'href' ).then( function(  hrefValueC ) {
                        expect( parseInt( hrefValueA.split( splitRegEx )[2] ) ).toBeLessThan( parseInt( hrefValueB.split( splitRegEx )[2] ) );
                        expect( parseInt( hrefValueB.split( splitRegEx )[2] ) ).toBeLessThan( parseInt( hrefValueC.split( splitRegEx )[2] ) );
                    });
                });
            });

        })

    });

    describe( 'when clicking the prospect detail link', function() {
        it( 'all normal links should navigate to the prospect detail page', function() {
            salesPage.prospectLinks.get( 1 ).click();

            // You can either see if certain elements on the resulting page are present
            expect( prospectPage.title.isPresent() ).toBeTruthy();
            expect( prospectPage.backLink.isPresent() ).toBeTruthy();

            // ...or define a unique identifying element for the page and look for that
            expect( prospectPage.isPagePresent() ).toEqual( true );
        });

    });
})