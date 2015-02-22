'use strict';

/*
 This test suite tests the actions / results of the custom HTTP interceptors added to the $httpProvider stack.  I could not figure out a way
 to inject the $httpProvider into the test suite in such a way that the interceptors could be inspected, so the tests demonstrate the
 actions of the interceptors on faked HTTP / Resource calls.
 */

describe( 'interceptorService', function () {
    var $rootScope,
        $httpBackend,
        $http,
        $resource,
        sessionService,
        mockResource;

    beforeEach( function () {
        module( 'firstSpark.services', function ( $provide ) {} );
        module( 'ngResource', function ( $provide ) {} );

        inject( function ( $injector ) {
            $rootScope = $injector.get( '$rootScope' );
            $httpBackend = $injector.get( '$httpBackend' );
            $http = $injector.get( '$http' );
            $resource = $injector.get( '$resource' );
            sessionService = $injector.get( 'sessionService' );
        } );

        //The URL can be anything as $httpBackend will mock the response
        mockResource = new $resource( '/testPost' );

        //Most interceptor actions will only be invoked if a session object exists in the $rootScope (makes for easier HTTP testing in other unit tests).
        $rootScope.session = {};
    });

    afterEach( function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    } );

    describe( 'customRequestInterceptor', function () {

        beforeEach( function () {
            $httpBackend.when( 'GET', /(\/testRequest\?_timestamp\=).*/ ).respond( 200, { timestampAdded: true } );
            $httpBackend.when( 'GET', 'test.html' ).respond( 200, { timestampAdded: false } );
        } )

        it( 'should add a timestamp to the end of GET REST requests', function () {
            //The real test is the fact that the $httpBackend URL matches the URL transformed by the interceptor, that an error is not thrown here.
            $http.get( '/testRequest' ).
                success(function(data, status, headers, config) {
                    expect( data.timestampAdded ).toBeDefined();
                    expect( data.timestampAdded ).toEqual( true );
                });

            $httpBackend.flush();
        } );

        it( 'should not add a timestamp to GET requests that retrieve HTML files (to allow for caching)', function () {
            //Again, the real test is that no error is thrown.
            $http.get( 'test.html' ).
                success(function(data, status, headers, config) {
                    expect( data.timestampAdded ).toBeDefined();
                    expect( data.timestampAdded ).toEqual( false );
                });

            $httpBackend.flush();
        } )

    } );

    describe( 'customResponseInterceptor', function () {
        beforeEach( function () {
            $httpBackend.when( 'POST', '/testNormalResponse' ).respond( 200 );
            spyOn( sessionService, 'clearSessionError' ).andCallThrough();
            $rootScope.session.errorMsg = 'session error';
        } );

        it( 'should call the sessionService clearSessionError() function and clear the session error', function () {
            $http.post( '/testNormalResponse' ).
                success(function(data, status, headers, config) {
                    expect( sessionService.clearSessionError.callCount ).toEqual( 1 );
                    expect( $rootScope.session.errorMsg ).toEqual( '' );
                });

            $httpBackend.flush();

        } )

    } );

    //Some of these tests mock both $http and $resource (ngResource) calls because there are some differences in how the response data is structured between the two.
    describe( 'customResponseErrorInterceptor:', function () {

        describe( 'when a 400 error is returned', function () {
            beforeEach( function () {
                $httpBackend.when( 'POST', '/testPost' ).respond( 400, { firstName: 'You must provide a first name' } );
                spyOn( sessionService, 'clearSessionError' ).andCallThrough();
                $rootScope.session.errorMsg = 'session error';
            } );

            it( 'should call the sessionService clearSessionError() function', function () {

                $http.post( '/testPost' ).
                    success(function(data, status, headers, config) {
                        //Not triggered
                    }).
                    error(function(data, status, headers, config) {
                        expect( sessionService.clearSessionError.callCount ).toEqual( 1 );
                        expect( $rootScope.session.errorMsg ).toEqual( '' );
                    });

                $httpBackend.flush();

            } );

            it( 'when using $http, should provide the HTTP status code and any error messages in the response data object', function () {

                $http.post( '/testPost' ).
                    success(function(data, status, headers, config) {
                        //Not triggered
                    }).
                    error(function(data, status, headers, config) {
                        expect( data instanceof Object ).toBeTruthy();
                        expect( data.httpStatusCode ).toEqual( 400 );
                        expect( data.errors instanceof Object ).toBeTruthy();
                        expect( data.errors.firstName ).toEqual( 'You must provide a first name' );
                    });

                $httpBackend.flush();
            } );

            it( 'when using $resource, should provide the HTTP status code and any error messages in the response data object', function () {

                 var saveObj = new mockResource( { saveData: true } );
                 saveObj.$save().then(
                     function ( successResponse ) {
                        //Not triggered
                     },
                     function ( errorResponse ) {
                         expect( errorResponse.data instanceof Object ).toBeTruthy();
                         expect( errorResponse.data.httpStatusCode ).toEqual( 400 );
                         expect( errorResponse.data.errors instanceof Object ).toBeTruthy();
                         expect( errorResponse.data.errors.firstName ).toEqual( 'You must provide a first name' );
                     }
                 )

                 $httpBackend.flush();
            } );


        } );

        describe( 'when a 403 error is returned', function () {
            beforeEach( function () {
                $httpBackend.when( 'POST', '/testPost' ).respond( 403, {} );
                spyOn( sessionService, 'clearSessionError' ).andCallThrough();
                spyOn( sessionService, 'handleNotAuthenticatedResponse' ).andCallThrough();
                $rootScope.session.errorMsg = 'session error';
            } );

            it( 'should call the sessionService clearSessionError() function', function () {

                $http.post( '/testPost' ).
                    success(function(data, status, headers, config) {
                        //Not triggered
                    }).
                    error(function(data, status, headers, config) {
                        expect( sessionService.clearSessionError.callCount ).toEqual( 1 );
                        expect( $rootScope.session.errorMsg ).toEqual( '' );
                    });

                $httpBackend.flush();

            } );

            it( 'when using $http, it should capture the 403 code and call the handleNotAuthenticatedResponse() function', function () {

                $http.post( '/testPost' ).
                    success(function(data, status, headers, config) {
                        //Not triggered
                    }).
                    error(function(data, status, headers, config) {
                        expect( sessionService.handleNotAuthenticatedResponse.callCount ).toEqual( 1 );
                        expect( $rootScope.session.errorMsg ).toEqual( '' );
                        expect( data instanceof Object ).toBeTruthy();
                        expect( data.httpStatusCode ).toEqual( 403 );
                    });

                $httpBackend.flush();

            } );
            it( 'when using $resource, it should capture the 403 code and call the handleNotAuthenticatedResponse() function', function () {
                var saveObj = new mockResource( { saveData: true } );
                saveObj.$save().then(
                    function ( successResponse ) {
                        //Not triggered
                    },
                    function ( errorResponse ) {
                        expect( sessionService.handleNotAuthenticatedResponse.callCount ).toEqual( 1 );
                        expect( $rootScope.session.errorMsg ).toEqual( '' );
                        expect( errorResponse.data instanceof Object ).toBeTruthy();
                        expect( errorResponse.data.httpStatusCode ).toEqual( 403 );

                    }
                )

                $httpBackend.flush();
            } );

        } );

        describe( 'when a 0 (CORS) error is returned', function () {
            beforeEach( function () {
                $httpBackend.when( 'POST', '/testPost' ).respond( 0, {} );
                spyOn( sessionService, 'clearSessionError' ).andCallThrough();
                spyOn( sessionService, 'handleCORSResponse' ).andCallThrough();
                $rootScope.session.errorMsg = '';
            } );

            it( 'should call the sessionService clearSessionError() function', function () {

                $http.post( '/testPost' ).
                    success(function(data, status, headers, config) {
                        //Not triggered
                    }).
                    error(function(data, status, headers, config) {
                        expect( sessionService.clearSessionError.callCount ).toEqual( 1 );

                    });

                $httpBackend.flush();

            } );

            it( 'when using $http, it should capture the 0 code and call the handleCORSResponse() function', function () {

                $http.post( '/testPost' ).
                    success(function(data, status, headers, config) {
                        //Not triggered
                    }).
                    error(function(data, status, headers, config) {
                        expect( sessionService.handleCORSResponse.callCount ).toEqual( 1 );
                        expect( $rootScope.session.errorMsg ).toEqual( 'The server did not respond to the previous request.' );
                        expect( data instanceof Object ).toBeTruthy();
                        expect( data.httpStatusCode ).toEqual( 0 );
                    });

                $httpBackend.flush();

            } );
            it( 'when using $resource, it should capture the 0 code and call the handleCORSResponse() function', function () {
                var saveObj = new mockResource( { saveData: true } );
                saveObj.$save().then(
                    function ( successResponse ) {
                        //Not triggered
                    },
                    function ( errorResponse ) {
                        expect( sessionService.handleCORSResponse.callCount ).toEqual( 1 );
                        expect( $rootScope.session.errorMsg ).toEqual( 'The server did not respond to the previous request.' );
                        expect( errorResponse.data instanceof Object ).toBeTruthy();
                        expect( errorResponse.data.httpStatusCode ).toEqual( 0 );

                    }
                )

                $httpBackend.flush();
            } );

        } );

        describe( 'when a 500 error is returned', function () {
            beforeEach( function () {
                $httpBackend.when( 'POST', '/testPost' ).respond( 500, {} );
                spyOn( sessionService, 'clearSessionError' ).andCallThrough();
                spyOn( sessionService, 'handle500Response' ).andCallThrough();
                $rootScope.session.errorMsg = '';
            } );

            it( 'should call the sessionService clearSessionError() function', function () {

                $http.post( '/testPost' ).
                    success(function(data, status, headers, config) {
                        //Not triggered
                    }).
                    error(function(data, status, headers, config) {
                        expect( sessionService.clearSessionError.callCount ).toEqual( 1 );
                    });

                $httpBackend.flush();

            } );

            it( 'when using $http, it should capture the 500 code and call the handle500Response() function', function () {

                $http.post( '/testPost' ).
                    success(function(data, status, headers, config) {
                        //Not triggered
                    }).
                    error(function(data, status, headers, config) {
                        expect( sessionService.handle500Response.callCount ).toEqual( 1 );
                        expect( $rootScope.session.errorMsg ).toEqual( 'An unexpected error has occurred. Please try again.' );
                        expect( data instanceof Object ).toBeTruthy();
                        expect( data.httpStatusCode ).toEqual( 500 );
                    });

                $httpBackend.flush();

            } );
            it( 'when using $resource, it should capture the 500 code and call the handle500Response() function', function () {
                var saveObj = new mockResource( { saveData: true } );
                saveObj.$save().then(
                    function ( successResponse ) {
                        //Not triggered
                    },
                    function ( errorResponse ) {
                        expect( sessionService.handle500Response.callCount ).toEqual( 1 );
                        expect( $rootScope.session.errorMsg ).toEqual( 'An unexpected error has occurred. Please try again.' );
                        expect( errorResponse.data instanceof Object ).toBeTruthy();
                        expect( errorResponse.data.httpStatusCode ).toEqual( 500 );

                    }
                )

                $httpBackend.flush();
            } );

        } );

    } );


});