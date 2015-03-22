'use strict';

describe( 'authService', function () {
    var mockSessionService,
        authService,
        $http,
        $q,
        $httpBackend;

    beforeEach( function () {
        //Make the module call for the module all services are tied to
        module( 'firstSpark.services', function( $provide ) {} );

        //Create the mock sessionService object
        mockSessionService = {
            setSessionUser: function() {},
            createSession: function() {},
            activateSession: function() {},
            getSessionUser: function() {}
        };

        //Replaces the injection of sessionService into authService with the mockSessionService object
        module(function ($provide) {
            $provide.value( 'sessionService', mockSessionService );
        });

        inject( function ( $injector ) {
            authService = $injector.get( 'authService' );
            $http = $injector.get( '$http' );
            $q = $injector.get( '$q' );
            $httpBackend = $injector.get( '$httpBackend' );
        })
        
    });

    afterEach( function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    } );

    describe( 'performLogin()', function() {

        beforeEach( function() {
            spyOn( mockSessionService, 'setSessionUser' ).andCallFake(function() {} );
        })

        afterEach( function() {
            $httpBackend.flush();
        })

        describe( 'on success', function() {
            beforeEach( function() {
                $httpBackend.whenPOST( '/mockPerformLogin' ).respond( 200, { user: { firstName: 'Bob' } }   );
            })

            it( 'executes sessionService.setSessionUser()', function() {
                authService.performLogin( { username: '', password: '' }).then(
                    function( response ) {
                        expect( mockSessionService.setSessionUser.callCount ).toEqual( 1 );
                    }
                )
            })

            it( 'returns a response object containing a user object', function() {
                authService.performLogin( { username: '', password: '' }).then(
                    function( response ) {
                        expect( response.data.user ).toBeDefined();
                    }
                )
            })
        })


        describe( 'on failure', function() {
            beforeEach( function() {
                $httpBackend.whenPOST( '/mockPerformLogin' ).respond( 400, { errors: { loginError: 'Did not work' } } );
            })

            it( 'does not executes sessionService.setSessionUser()', function() {
                authService.performLogin( { username: '', password: '' }).error(
                    function( response ) {
                        expect( mockSessionService.setSessionUser.callCount ).toEqual( 0 );
                    }
                )
            })

            it( 'returns a response object containing an errors object', function() {
                authService.performLogin( { username: '', password: '' }).error(
                    function( response ) {
                        expect( response.errors ).toBeDefined();
                    }
                )
            })
        })

    })

    describe( 'performLogout()', function() {

        beforeEach( function() {
            spyOn( mockSessionService, 'createSession' ).andCallFake(function() {} );
        })

        afterEach( function() {
            $httpBackend.flush();
        })

        describe( 'on success', function() {
            beforeEach( function() {
                $httpBackend.whenPOST( '/mockPerformLogout' ).respond( 200, {} );
            })

            it( 'executes sessionService.createSession()', function() {
                authService.performLogout().then(
                    function( response ) {
                        expect( mockSessionService.createSession.callCount ).toEqual( 1 );
                    }
                )
            })

        })


        describe( 'on failure', function() {
            beforeEach( function() {
                $httpBackend.whenPOST( '/mockPerformLogout' ).respond( 400, { errors: { logoutError: 'Did not work' } } );
            })

            it( 'does not executes sessionService.createSession()', function() {
                authService.performLogout().error(
                    function( response ) {
                        expect( mockSessionService.createSession.callCount ).toEqual( 0 );
                    }
                )
            })

            it( 'returns a response object containing an errors object', function() {
                authService.performLogout().then(
                    function( response ) {
                        expect( response.errors ).toBeDefined();
                    }
                )
            })
        })

    })

    describe( 'requestUser()', function() {

        beforeEach( function() {
            spyOn( mockSessionService, 'setSessionUser' ).andCallFake(function() {} );
            spyOn( mockSessionService, 'activateSession' ).andCallFake(function() {} );
        })

        afterEach( function() {
            $httpBackend.flush();
        })

        describe( 'on success', function() {
            beforeEach( function() {
                $httpBackend.whenGET( '/mockRequestUser' ).respond( 200, { user: { firstName: 'Frank' } }   );
            })

            it( 'executes sessionService setSessionUser() and activateSession()', function() {
                authService.requestUser().then(
                    function( response ) {
                        expect( mockSessionService.setSessionUser.callCount ).toEqual( 1 );
                        expect( mockSessionService.activateSession.callCount ).toEqual( 1 );
                    }
                )
            })

            it( 'executes sessionService.setSessionUser()', function() {
                authService.requestUser().then(
                    function( response ) {
                        expect( mockSessionService.setSessionUser.callCount ).toEqual( 1 );
                    }
                )
            })

        })


        describe( 'on failure', function() {
            beforeEach( function() {
                $httpBackend.whenGET( '/mockRequestUser' ).respond( 400, { errors: { request: 'Did not work' } } );
            })

            it( 'does not executes sessionService.setSessionUser()', function() {
                authService.requestUser( { username: '', password: '' }).error(
                    function( response ) {
                        expect( mockSessionService.setSessionUser.callCount ).toEqual( 0 );
                    }
                )
            })

            it( 'executes sessionService.activateSession()', function() {
                authService.requestUser().then(
                    function( response ) {
                        expect( mockSessionService.activateSession.callCount ).toEqual( 1 );
                    }
                )
            })

        })

    })

    describe( 'getSessionUser', function() {
        it( 'executes sessionService.getSessionUser()', function() {
            spyOn( mockSessionService, 'getSessionUser' ).andCallFake(function() {} );
            authService.getSessionUser();
            expect( mockSessionService.getSessionUser.callCount ).toEqual( 1 );
        })
    })

    describe( 'saveAccountChanges()', function() {

        var userAccount = { firstName: 'John', lastName: 'Jordan', email: 'josquared@foo.com' };

        beforeEach( function() {
            spyOn( mockSessionService, 'getSessionUser' ).andCallFake(function() { return userAccount } );
        })

        afterEach( function() {
            $httpBackend.flush();
        })

        describe( 'on success', function() {
            beforeEach( function() {
                $httpBackend.whenPOST( '/mockSaveAccountChanges' ).respond( 200, {}   );
            })

            it( 'executes sessionService.getSessionUser()', function() {
                authService.saveAccountChanges(  userAccount ).then(
                    function( response ) {
                        expect( mockSessionService.getSessionUser.callCount ).toEqual( 1 );
                    }
                )
            })

        })


        describe( 'on failure', function() {
            beforeEach( function() {
                $httpBackend.whenPOST( '/mockSaveAccountChanges' ).respond( 400, { errors: { updateError: 'Did not work' } } );
            })

            it( 'does not executes sessionService.getSessionUser()', function() {
                authService.saveAccountChanges( userAccount ).error(
                    function( response ) {
                        expect( mockSessionService.getSessionUser.callCount ).toEqual( 0 );
                    }
                )
            })

            it( 'returns a response object containing an errors object', function() {
                authService.saveAccountChanges( userAccount ).error(
                    function( response ) {
                        expect( response.errors ).toBeDefined();
                    }
                )
            })
        })
    })

});