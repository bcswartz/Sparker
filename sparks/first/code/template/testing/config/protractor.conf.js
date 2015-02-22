var PrepareObject = require( '../e2e/helpers/PrepareObject.js' );
var prepareObject;

exports.config = {

    //Setting directConnect to true means it'll run the tests via Chrome.  You could alternatively start up the Selenium server by pointing to
    //the location of the Selenium server .jar file on your machine.
    directConnect: true,

	capabilities : {
		browserName : 'chrome',
		'chromeOptions': {
			args: [ '--test-type' ] //prevents warning about --ignore-certificate-errors flag
		}
	},

	suites: {
		unauthenticated: '../e2e/testFiles/unauthenticated/**/*.js',
		authenticated: '../e2e/testFiles/authenticated/*.js',
		sales: [
            '../e2e/testFiles/authenticated/sales/**/*.js',
            '../e2e/testFiles/authenticated/*.js'
        ],
		accounting: [
            '../e2e/testFiles/authenticated/accounting/**/*.js',
            '../e2e/testFiles/authenticated/*.js'
        ],
        admin: [
            '../e2e/testFiles/authenticated/admin/**/*.js',
            '../e2e/testFiles/authenticated/*.js'
        ]
	},

	onPrepare: function() {
        //Pulls in the jasmine-reporters Node module.  The reporters give you more options in terms of how the test results are output
        require( 'jasmine-reporters' );

		//This reporter enhances the default report output to denote tests that passed as well as those that failed.
		jasmine.getEnv().addReporter(new jasmine.TapReporter());

		prepareObject = new PrepareObject();
		var directives = prepareObject.getDirectives( this );

		console.log( 'Preparing tests for the "' + directives.suite + '" suite of tests...' );

        //Check if this is a suite of tests that involve authentication
		if ( directives.authenticate ) {

			browser.driver.get( directives.loadingRoute );
			//Wait for username box to be available
			browser.driver.wait( function() {
				return browser.driver.isElementPresent( by.id( 'username' ) );
			})
			browser.driver.findElement( by.id( 'username' ) ).sendKeys( directives.user.username );
			browser.driver.findElement( by.id( 'password' ) ).sendKeys( directives.user.password );

			browser.driver.findElement( by.id( 'loginSubmitBtn' )).click();

			browser.driver.wait(function() {
				return browser.driver.getCurrentUrl().then(function(url) {
                    if ( directives.urlRegex.test( url ) ) {
						browser.params.user = directives.user;
						console.log( 'Preparation complete. Running tests.' );
						console.log( '______________________________________________________________________________________________');
						return true
					}
				});
			});

		} else {
            //Need to wait for a view to load before proceeding
            browser.driver.get( directives.loadingRoute );
            //Wait for an element in the targeted Angular view to be loaded
            browser.driver.wait( function() {
                return browser.driver.isElementPresent( by.id( 'homeTitle' ) );
            });
			console.log( 'Preparation complete. Running tests.' );
			console.log( '______________________________________________________________________________________________');
			return true;
		}

	}
}