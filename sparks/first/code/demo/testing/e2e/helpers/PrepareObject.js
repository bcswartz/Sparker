var PrepareObject = ( function() {

    this.projectUrl = 'http://localhost/Sparker';
    this.homeRoute = this.projectUrl + '/app/#/home';
    this.loginRoute = this.projectUrl + '/app/#/login';

	this.getDirectives = function( protractor ) {
		var suiteParameter = this.determineSuite( protractor );
		var suite = suiteParameter != null ? suiteParameter : 'None';

		switch ( suite ) {
			case 'unauthenticated':
				return {
					suite: suite,
					authenticate: false,
                    loadingRoute: this.homeRoute
				};
			break;

            case 'admin':
                return {
                    suite: suite,
                    authenticate: true,
                    loadingRoute: this.loginRoute,
                    user: {
                        username: 'admin',
                        password: 'Password1',
                        firstName: 'Roger',
                        lastName: 'Big Kahuna',
                        email: 'admin@foobar.com'
                    },
                    urlRegex: new RegExp( 'authorized' )
                };
                break;

			case 'authenticated':
				return {
					suite: suite,
					authenticate: true,
                    loadingRoute: this.loginRoute,
					user: {
						username: 'admin',
						password: 'Password1',
                        firstName: 'Roger',
                        lastName: 'Big Kahuna',
                        email: 'admin@foobar.com'
					},
					urlRegex: new RegExp( 'authorized' )
				};
			break;

			case 'sales':
				return {
					suite: suite,
					authenticate: true,
                    loadingRoute: this.loginRoute,
					user: {
                        username: 'salesGuy',
                        password: 'Password1',
                        firstName: 'Johnny',
                        lastName: 'Slick',
                        email: 'salesGuy@foobar.com'
					},
					urlRegex: new RegExp( 'authorized' )
				};
			break;

			case 'accounting':
				return {
					suite: suite,
					authenticate: true,
                    loadingRoute: this.loginRoute,
					user: {
                        username: 'beanCounter',
                        password: 'Password1',
                        firstName: 'Reginald',
                        lastName: 'Math',
                        email: 'beanCounter@foobar.com'
					},
					urlRegex: new RegExp( 'authorized' )
				};
			break;

			default:
				return {
					suite: suite,
					authenticate: false,
                    loadingRoute: this.homeRoute
				};
			break;
		}
	}

	this.determineSuite = function( protractor ) {
		var suite;
		for( var arg in protractor.process.argv ) {
			argArray = protractor.process.argv[ arg ].split( '=' );
			if ( argArray.length == 2 && argArray[0] == '--suite' ) {
				if ( argArray[1].split( ',' ).length > 1 ) {
					suite = argArray[1].split( ',' )[0];
				} else {
					suite = argArray[1];
				}

				break;
			}
		}

		return suite;
	}
});

module.exports = PrepareObject;