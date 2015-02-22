'use strict';

var AccountingPage = require( '../../../pageObjects/AccountingPage.js' );
var accountingPage;

describe( 'Accounting page view', function() {
    var pageLoaded = false;
    beforeEach( function() {
        if( !pageLoaded ) {
            accountingPage = new AccountingPage();
            accountingPage.get();
            pageLoaded = true;
        }
    });
    
    describe( 'on page load', function() {
        it( 'should display the expected title', function() {
            expect( accountingPage.title.getText()).toEqual( 'Top Client Accounts By Profit' );
        });
        
        it( 'should display all rows of data with expected data bindings', function() {
            expect( accountingPage.tableRows.count() ).toEqual( 5 );
            expect( accountingPage.clientNames.count() ).toEqual( 5 );
            expect( accountingPage.incomes.count() ).toEqual( 5 );
            expect( accountingPage.expenses.count() ).toEqual( 5 );
            expect( accountingPage.profits.count() ).toEqual( 5 );
        });

        it( 'should display the rows by profit in descending order', function() {
            accountingPage.profits.get( 0 ).getText().then( function( profitA ) {
                accountingPage.profits.get( 1 ).getText().then( function( profitB ) {
                    accountingPage.profits.get( 2 ).getText().then( function( profitC ) {
                        // An example of how formatting a bound value can make it hard to evaluate in a test like this
                        expect( parseInt( parseInt( profitA.slice(2).replace(/,/g,"") ) ) ).toBeGreaterThan( parseInt( profitB.slice(2).replace(/,/g,"") ) );
                        expect( parseInt( parseInt( profitB.slice(2).replace(/,/g,"") ) ) ).toBeGreaterThan( parseInt( profitC.slice(2).replace(/,/g,"") ) );
                    })
                })
            })
        });
    });
});