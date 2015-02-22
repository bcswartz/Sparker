'use strict';

describe( 'prospectController', function () {
    var $rootScope,
        $q,
        mockRouteParams,
        mockDemoService,
        vm,
        getController;

    beforeEach( function () {
        module( 'firstSpark.controllers', function ( $provide ) {} );
        module( 'firstSpark.services', function ( $provide ) {} );

        inject( function ( $injector ) {
            $rootScope = $injector.get( '$rootScope' );
            $q = $injector.get( '$q' );
            mockRouteParams = { prospectId: 1 };
            mockDemoService = {
                getProspect: function ( prospectId ) {}
            };

            getController = function () {
                return $injector.get( '$controller' )( 'prospectController', {
                    '$routeParams': mockRouteParams,
                    'demoService': mockDemoService
                } )
            }

        } );
    });

    describe( 'controller load', function() {

        beforeEach( function() {
            spyOn( mockDemoService, 'getProspect' ).andCallFake( function() {
                var deferred = $q.defer();
                deferred.resolve(
                    {
                        data:
                            { id: 2, fullName: 'Bob Frankel', phone: '888-555-3145', email: 'bfrank@gmail.com', address: '211 Brandon Street, Annapolis, MD 20887' }
                    }
                );
                return deferred.promise;
            });

        })

        it( 'should execute getProspect() and get the prospect data', function () {
            vm = getController();
            //Need to run to pick up changes to the controller object properties
            $rootScope.$digest();
            expect( mockDemoService.getProspect.callCount ).toEqual( 1 );
            expect( vm.prospect.email ).toEqual( 'bfrank@gmail.com' );
        });

    })

});