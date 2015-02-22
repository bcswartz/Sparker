'use strict';

describe( 'accountingController', function () {
    var $rootScope,
        vm,
        $q,
        mockDemoService,
        getController;

    beforeEach( function () {
        module( 'firstSpark.controllers', function ( $provide ) {} );
        module( 'firstSpark.services', function ( $provide ) {} );

        inject( function ( $injector ) {
            $rootScope = $injector.get( '$rootScope' );
            $q = $injector.get( '$q' );
            mockDemoService = {
                getClients: function () {}
            };

            getController = function () {
                return $injector.get( '$controller' )( 'accountingController', {
                    'demoService': mockDemoService
                } )
            }

        } );
    });

    describe( 'controller load', function() {

        beforeEach( function() {
            spyOn( mockDemoService, 'getClients' ).andCallFake( function() {
                var deferred = $q.defer();
                deferred.resolve(
                    {
                        data:
                            [
                                { id: 821, name: 'Atlas Holdings', income: 4500000, expenditures: 2300000 },
                                { id: 34, name: 'Mountain High Systems', income: 4150000, expenditures: 3400000 },
                                { id: 567, name: 'Glitter Glass', income: 3800500, expenditures: 3500000 },
                                { id: 788, name: 'Melantory Incorporated', income: 3800000, expenditures: 3590000 },
                                { id: 513, name: 'Roundel Marketing', income: 5145000, expenditures: 4950000 }
                             ]
                    }
                );
                return deferred.promise;
            });

            vm = getController();
        })

        it( 'should set initial scope values properly', function () {
            expect( vm.uiState instanceof Object ).toBeTruthy();
            expect( vm.uiState.pageLoaded ).toEqual( false );
        });

        it( 'should execute getClients() and set pageLoaded to true', function () {
            //Need to run to pick up changes to the controller object properties
            $rootScope.$digest();

            expect( mockDemoService.getClients.callCount ).toEqual( 1 );
            expect( vm.uiState.pageLoaded ).toEqual( true );
            expect( vm.clients.length ).toEqual( 5 );
        });

    })

});