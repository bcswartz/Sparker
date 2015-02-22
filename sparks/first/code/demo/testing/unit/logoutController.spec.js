'use strict';

describe( 'logoutController', function () {

    var $rootScope,
        $q,
        $location,
        mockAuthService,
        getController;

    beforeEach( function () {
        module( 'firstSpark.controllers', function ( $provide ) {} );
        module( 'firstSpark.services', function ( $provide ) {} );

        inject( function ( $injector ) {
            $rootScope = $injector.get( '$rootScope' );
            $q = $injector.get( '$q' );
            $location = $injector.get( '$location' );
            mockAuthService = {
                performLogout: function () {}
            };

            getController = function () {
                return $injector.get( '$controller' )( 'logoutController', {
                    '$location': $location,
                    'authService': mockAuthService
                } )
            }

        } );


    });

    describe( 'performLogout', function () {
        describe( 'when executes successfully', function() {
            beforeEach( function() {
                spyOn( mockAuthService, 'performLogout' ).andCallFake( function() {
                    var deferred = $q.defer();
                    deferred.resolve( {} );
                    return deferred.promise;
                });

                getController();
            });

            it( 'should execute the location path for a successful logout', function() {
                //Need to run digest to process the controller load
                $rootScope.$digest();
                expect( mockAuthService.performLogout.callCount ).toEqual( 1 );
                expect( $location.path() ).toBe( '/home' );
            });
        });
        describe( 'when an error occurs', function() {
            beforeEach( function() {
                spyOn( mockAuthService, 'performLogout' ).andCallFake( function() {
                    var deferred = $q.defer();
                    deferred.resolve( $q.reject( {} ) );
                    return deferred.promise;
                });

                getController();
            });

            it( 'should execute the location path for a failed logout', function() {
                //Need to run digest to process the controller load
                $rootScope.$digest();
                expect( mockAuthService.performLogout.callCount ).toEqual( 1 );
                expect( $location.path() ).toBe( '/logoutError' );
            });
        });
    });

});