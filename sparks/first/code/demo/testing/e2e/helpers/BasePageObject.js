var BasePageObject = ( function() {

    this.isPagePresent = function() {
        if ( this.pageIdentifier == undefined ) {
            throw new Error( 'No pageIdentifier element defined', 'There is no pageIdentifier property defined in this page object.' );
        } else {
            return this.pageIdentifier.isPresent();
        }
    }

    this.refreshPage = function() {
        browser.refresh();
    }

    this.setInputValue = function( inputName, value, append ) {
        if ( this[ inputName ] == undefined ) {
            throw new Error( 'Unknown input', 'The input ' + inputName + ' is not defined in this page object.' );
        } else {
            if( !append ) {
                this[ inputName ].clear();
            }
            this[ inputName ].sendKeys( value );
        }
    };

    this.clickElement = function( elementName ) {
        if ( this[ elementName ] == undefined ) {
            throw new Error( 'Unknown DOM element', 'The DOM element ' + elementName + ' is not defined in this page object.' );
        } else {
            this[ elementName ].click();
        }
    }

});

module.exports = BasePageObject;