'use strict';

describe( 'userAccountController', function () {

    var $rootScope,
        $q,
        mockAuthService,
        getController,
        vm,
        userAccount = { firstName: 'first', lastName: 'last', email: 'mail' };

    beforeEach( function () {
        module( 'firstSpark.controllers', function ( $provide ) {} );
        module( 'firstSpark.services', function ( $provide ) {} );

        inject( function ( $injector ) {
            $rootScope = $injector.get( '$rootScope' );
            $q = $injector.get( '$q' );
            mockAuthService = {
                getSessionUser: function () {},
                saveAccountChanges: function ( account ) {}
            };

            getController = function () {
                return $injector.get( '$controller' )( 'userAccountController', {
                    'authService': mockAuthService
                } )
            }

        } );

    });

    describe( 'variable values after controller loads', function() {

        beforeEach( function() {
            spyOn( mockAuthService, 'getSessionUser' ).andCallFake( function() {
                var deferred = $q.defer();
                deferred.resolve( userAccount );
                return deferred.promise;
            });

            vm = getController();
        })


        it( 'should set initial scope values properly', function () {
            expect( vm.uiState instanceof Object ).toBeTruthy();
            expect( vm.uiState.sending ).toEqual( false );
            expect( vm.uiState.success ).toEqual( false );
            expect( vm.account instanceof Object ).toBeTruthy();
            //Unclear as to why the values in the copied object are nested within the $$state object
            expect( vm.account.$$state.value.firstName ).toEqual( userAccount.firstName );
            expect( vm.account.$$state.value.lastName ).toEqual( userAccount.lastName );
            expect( vm.account.$$state.value.email ).toEqual( userAccount.email );
            expect( vm.errors ).toEqual( {} );
        });
    })

    describe( 'saveChanges()', function() {
        describe( 'when executes successfully and account updates', function() {
            beforeEach( function() {
                spyOn( mockAuthService, 'getSessionUser' ).andCallFake( function() {
                    var deferred = $q.defer();
                    deferred.resolve( userAccount );
                    return deferred.promise;
                });

                spyOn( mockAuthService, 'saveAccountChanges' ).andCallFake( function() {
                    var deferred = $q.defer();
                    deferred.resolve( true );
                    return deferred.promise;
                })

                vm = getController();
            })

            it( 'should end up with proper uiState values', function() {
                //uiState.sending is set to true at start of function execution, but set it here anyway.
                vm.uiState = { sending: true, success: false };
                vm.saveChanges();

                //Need to run to pick up changes to the controller object properties
                $rootScope.$digest();

                expect( vm.uiState.sending ).toEqual( false );
                expect( vm.uiState.success ).toEqual( true );
            })

        })

        describe( 'when an error occurs', function() {
            beforeEach( function() {
                spyOn( mockAuthService, 'getSessionUser' ).andCallFake( function() {
                    var deferred = $q.defer();
                    deferred.resolve( userAccount );
                    return deferred.promise;
                });

                spyOn( mockAuthService, 'saveAccountChanges' ).andCallFake( function() {
                    var deferred = $q.defer();
                    deferred.resolve( $q.reject( { data: { errors: { firstName: 'required' } } } ) );
                    return deferred.promise;
                })

                vm = getController();
            })

            it( 'should end up with proper uiState values', function() {
                //uiState.sending is set to true at start of function execution, but set it here anyway.
                vm.uiState = { sending: true, success: false };
                vm.saveChanges();

                //Need to run to pick up changes to the controller object properties
                $rootScope.$digest();

                expect( vm.uiState.sending ).toEqual( false );
                expect( vm.uiState.success ).toEqual( false );
            })

            it( 'should end up with proper uiState values', function() {
                //uiState.sending is set to true at start of function execution, but set it here anyway.
                vm.uiState = { sending: true, success: false };
                //And vm.errors should start empty
                vm.errors = {};

                vm.saveChanges();

                //Need to run to pick up changes to the controller object properties
                $rootScope.$digest();

                expect( vm.errors instanceof Object ).toBeTruthy();
                expect( vm.errors.firstName ).toEqual( 'required' );
            })

        })

    })

});