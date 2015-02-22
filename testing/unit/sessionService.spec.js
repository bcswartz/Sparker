'use strict';

describe( 'sessionService', function () {
    var $rootScope,
        $location,
        $httpBackend,
        $http,
        sessionService;

    beforeEach( function () {
        module( 'firstSpark.services', function( $provide ) {} );

        inject( function ( $injector ) {
            sessionService = $injector.get( 'sessionService' );
            $rootScope = $injector.get( '$rootScope' );
            $httpBackend = $injector.get( '$httpBackend' );
            $http = $injector.get( '$http' );
            $location = $injector.get( '$location' )
        })
        
    });

    describe( 'createSession()', function() {
        it( 'should create/initialize the session with the proper settings', function () {
            sessionService.createSession();
            expect( $rootScope.session ).toBeDefined();
            expect( $rootScope.session instanceof Object ).toBeTruthy();
            expect( $rootScope.session.active ).toBeFalsy();
            expect( $rootScope.session.authenticated ).toBeFalsy();
            expect( $rootScope.session.errorMsg ).toEqual( '' );
            expect( $rootScope.session.location).toEqual( '' );
        } );
    })

    describe( 'activateSession()', function() {
        it( 'should make the session active', function () {
            $rootScope.session = { active: false };
            expect( $rootScope.session.active ).toEqual( false );
            sessionService.activateSession();
            expect( $rootScope.session.active ).toEqual( true );
        } );
    })

    describe( 'setSessionUser()', function() {

        var userObject;

        describe( 'when user parameter is defined', function() {

            beforeEach( function() {
                $rootScope.session = { authenticated: false };
                userObject = { id: 1, firstName: 'Bob' };
            })

            it( 'should copy the user into the session', function() {
                sessionService.setSessionUser( userObject );
                expect( $rootScope.session.user ).toBeDefined();
                expect( $rootScope.session.user.id ).toEqual( 1 );
                expect( $rootScope.session.user.firstName ).toEqual( 'Bob' );
            })

            it( 'should set the session as authenticated', function() {
                sessionService.setSessionUser( userObject );
                expect( $rootScope.session.authenticated ).toEqual( true );
            })
        })
        describe( 'when user parameter is undefined', function() {

            beforeEach( function() {
                $rootScope.session = { authenticated: false, user: { id: 2, firstName: 'Jane' } };
                userObject = undefined;
            })

            it( 'should not change any user already in session', function() {
                sessionService.setSessionUser( userObject );
                expect( $rootScope.session.user ).toBeDefined();
                expect( $rootScope.session.user.id ).toEqual( 2 );
                expect( $rootScope.session.user.firstName ).toEqual( 'Jane' );
            })

            it( 'should not change the session authenticated value', function() {
                sessionService.setSessionUser( userObject );
                expect( $rootScope.session.authenticated ).toEqual( false );
            })
        })
    })

    describe( 'getSessionUser', function() {
        it( 'should return the session user object if there is one', function() {
            $rootScope.session = { user: { id: 3, firstName: 'Gail' } };
            var userInstance = sessionService.getSessionUser();
            expect( userInstance instanceof Object ).toBeTruthy();
            expect( userInstance.id ).toEqual( 3 );
            expect( userInstance.firstName ).toEqual( 'Gail' );
        })

        it( 'should return an empty object if no session.user exists', function() {
            $rootScope.session = { authenticated: false };
            var userInstance = sessionService.getSessionUser();
            expect( userInstance instanceof Object ).toBeTruthy();
            expect( userInstance ).toEqual( {} );
        })

    })

    describe( 'isUserAuthenticated', function() {
        it( 'should denote if a user exists in the session', function() {
            $rootScope.session = { user: { id: 4, firstName: 'Ralph' } };
            expect( sessionService.isUserAuthenticated() ).toEqual( true );
            $rootScope.session = { authenticated: false };
            expect( sessionService.isUserAuthenticated() ).toEqual( false );
        })
    })

    describe( 'handleNotAuthenticatedResponse()', function() {

        beforeEach( function() {
            $rootScope.session = { location: 'location' };
            spyOn( sessionService, 'revokeAuthentication' ).andCallThrough();
        })

        it( 'should call revokeAuthentication', function() {
            sessionService.handleNotAuthenticatedResponse();
            expect( sessionService.revokeAuthentication.callCount ).toEqual( 1 );
        })

        it( 'should redirect the user to the login route', function() {
            sessionService.handleNotAuthenticatedResponse();
            expect( $location.path() ).toBe( '/login' );
        })
    })

    describe( 'handleCORSResponse()', function() {

        beforeEach( function() {
            $rootScope.session = { location: 'location' };
            spyOn( sessionService, 'revokeAuthentication' ).andCallThrough();
            $rootScope.session = { errorMsg: '' };
        })

        it( 'should call revokeAuthentication', function() {
            sessionService.handleCORSResponse();
            expect( sessionService.revokeAuthentication.callCount ).toEqual( 1 );
        })

        it( 'should set the errorMsg for the session ', function() {
            sessionService.handleCORSResponse();
            expect( $rootScope.session.errorMsg ).toEqual( 'The server did not respond to the previous request.' );
        })

        it( 'should redirect the user to the login route', function() {
            sessionService.handleCORSResponse();
            expect( $location.path() ).toBe( '/login' );
        })
    })

    describe( 'handle500Response()', function() {

        it( 'should set the errorMsg for the session', function() {
            $rootScope.session = { errorMsg: '' };
            sessionService.handle500Response();
            expect( $rootScope.session.errorMsg ).toEqual( 'An unexpected error has occurred. Please try again.' );
        })

    })

    describe( 'clearSessionError()', function() {

        beforeEach( function() {
            $rootScope.session = {
                errorMsg: 'session error',
                location: 'previousLocation'
            }
        })

        describe( 'when the current location does not equal the location recorded in session', function() {

            beforeEach( function() {
                $location.path( '/newLocation' );
            })

            it( 'should clear any errorMsg in the session', function() {
                sessionService.clearSessionError();
                expect( $rootScope.session.errorMsg ).toEqual( '' );
            })

            it( 'should update the session.location', function() {
                sessionService.clearSessionError();
                expect( $rootScope.session.location ).toEqual( $location.path() );
            })
        })
        describe( 'when the current location is still the same as the location recorded in session', function() {

            beforeEach( function() {
                $location.path( '/previousLocation' );
            })

            it( 'should clear any errorMsg in the session', function() {
                sessionService.clearSessionError();
                expect( $rootScope.session.errorMsg).toEqual( '' );
            })

            it( 'should update the session.location', function() {
                sessionService.clearSessionError();
                expect( $rootScope.session.location ).toEqual( $location.path() );
            })
        })
    })

});