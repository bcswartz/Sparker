'use strict';

describe( 'loginController', function () {
    var $rootScope,
        $q,
        $location,
        mockAuthService,
        vm,
        getController;

    beforeEach( function () {
        module( 'firstSpark.controllers', function ( $provide ) {} );
        module( 'firstSpark.services', function ( $provide ) {} );

        inject( function ( $injector ) {
            $rootScope = $injector.get( '$rootScope' );
            $q = $injector.get( '$q' );
            $location = $injector.get( '$location' );
            mockAuthService = {
                performLogin: function ( userLogin ) {}
            };

            getController = function () {
                return $injector.get( '$controller' )( 'loginController', {
                    '$location': $location,
                    'authService': mockAuthService
                } )
            }

        } );


    });

    describe( 'variable values after controller loads', function() {
        it( 'should set initial scope values properly', function () {
            vm = getController();

            expect( vm.uiState instanceof Object ).toBeTruthy();
            expect( vm.uiState.sending ).toEqual( false );
            expect( vm.userLogin instanceof Object).toBeTruthy();
            expect( vm.userLogin.username).toEqual( '' );
            expect( vm.userLogin.password).toEqual( '' );
        });
    })

    describe( 'performLogin', function() {
        describe( 'when executes successfully and user authenticates', function() {
            beforeEach( function() {
                spyOn( mockAuthService, 'performLogin' ).andCallFake( function() {
                    var deferred = $q.defer();
                    deferred.resolve( { data: { authenticated: true } } );
                    return deferred.promise;
                });

                vm = getController();
            })

            it( 'should set uiState.sending to false', function() {
                //uiState.sending is set to true at start of function execution, but set it here anyway.
                vm.uiState.sending = true;
                vm.performLogin();
                //Need to run to pick up changes to the controller object properties
                $rootScope.$digest();

                expect( vm.uiState.sending ).toEqual( false );
            });

            it( 'should execute authService.performLogin once', function() {
                vm.performLogin();
                //Need to run to pick up changes to the controller object properties
                $rootScope.$digest();
                expect( mockAuthService.performLogin.callCount ).toEqual( 1 );
            });

            it( 'should set the location path to redirect the authenticated user', function() {
                vm.performLogin();
                //Need to run to pick up changes to the controller object properties
                $rootScope.$digest();
                expect( $location.path() ).toBe( '/auth/authorized' );
            })

        })
        describe( 'when executes successfully but user authentication fails', function() {
            beforeEach( function() {
                spyOn( mockAuthService, 'performLogin' ).andCallFake( function() {
                    var deferred = $q.defer();
                    deferred.resolve( { data: { authenticated: false } } );
                    return deferred.promise;
                });

                vm = getController();
                //Reset the error object
                vm.error = '';
            })

            it( 'should set uiState.sending to false', function() {
                //uiState.sending is set to true at start of function execution, but set it here anyway.
                vm.uiState.sending = true;
                vm.performLogin();
                //Need to run to pick up changes to the controller object properties
                $rootScope.$digest();

                expect( vm.uiState.sending ).toEqual( false );
            });

            it( 'should execute authService.performLogin once', function() {
                vm.performLogin();
                //Need to run to pick up changes to the controller object properties
                $rootScope.$digest();
                expect( mockAuthService.performLogin.callCount ).toEqual( 1 );
            });

            it( 'should set an error on the $scope', function() {
                vm.performLogin();
                //Need to run to pick up changes to the controller object properties
                $rootScope.$digest();
                expect( vm.error ).toEqual( 'Sorry, there is no user with that username and password.' );
            });

        })

        describe( 'when execution throws an error', function() {
            beforeEach( function() {
                spyOn( mockAuthService, 'performLogin' ).andCallFake( function() {
                    var deferred = $q.defer();
                    deferred.resolve( $q.reject( { data: { error: 'auth error' } } ) );
                    return deferred.promise;
                });

                vm = getController();
                //Reset the error object
                vm.error = '';
            })

            it( 'should set uiState.sending to false', function() {
                //uiState.sending is set to true at start of function execution, but set it here anyway.
                vm.uiState.sending = true;
                vm.performLogin();
                //Need to run to pick up changes to the controller object properties
                $rootScope.$digest();

                expect( vm.uiState.sending ).toEqual( false );
            });

            it( 'should execute authService.performLogin once', function() {
                vm.performLogin();
                //Need to run to pick up changes to the controller object properties
                $rootScope.$digest();
                expect( mockAuthService.performLogin.callCount ).toEqual( 1 );
            });

            it( 'should set error on the $scope based on error returned', function() {
                vm.performLogin();
                //Need to run to pick up changes to the controller object properties
                $rootScope.$digest();
                expect( vm.error ).toEqual( 'auth error' );
            });

        })

    })


});