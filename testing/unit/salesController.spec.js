'use strict';

describe( 'salesController', function () {
    var $rootScope,
        $q,
        mockDemoService,
        vm,
        getController;

    beforeEach( function () {
        module( 'firstSpark.controllers', function ( $provide ) {} );
        module( 'firstSpark.services', function ( $provide ) {} );

        inject( function ( $injector ) {
            $rootScope = $injector.get( '$rootScope' );
            $q = $injector.get( '$q' );
            mockDemoService = {
                getProspects: function () {}
            };

            getController = function () {
                return $injector.get( '$controller' )( 'salesController', {
                    'demoService': mockDemoService
                } )
            }

        } );
    });

    describe( 'controller load', function() {

        beforeEach( function() {
            spyOn( mockDemoService, 'getProspects' ).andCallFake( function() {
                var deferred = $q.defer();
                deferred.resolve(
                    {
                        data:
                            [
                                { id: 1, fullName: 'Lost Authentication', phone: '888-555-0001', email: 'unknown@gmail.com', address: 'Nowhere, Dundalk, MD 20400' },
                                { id: 2, fullName: 'Bob Frankel', phone: '888-555-3145', email: 'bfrank@gmail.com', address: '211 Brandon Street, Annapolis, MD 20887' },
                                { id: 3, fullName: 'Deborah Horning', phone: '888-555-9879', email: 'debhorn@gmail.com', address: '34 Ace Avenue, Annapolis, MD 20887' },
                                { id: 4, fullName: 'Sasha Lattimer', phone: '888-555-7681', email: 'saslat@gmail.com', address: '67 Junction Road, Baltimore, MD 20115' },
                                { id: 5, fullName: 'Harold Nuremburg', phone: '888-555-0861', email: 'harryN@gmail.com', address: '11A West 34 Ave, Baltimore, MD 20116' },
                                { id: 6, fullName: 'Betty Risling', phone: '888-555-5123', email: 'brise@gmail.com', address: '2331 Cherry Lane, Dundalk, MD 20400' }
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
            expect( mockDemoService.getProspects.callCount ).toEqual( 1 );
            expect( vm.uiState.pageLoaded ).toEqual( true );
            expect( vm.prospects.length ).toEqual( 6 );
        });

    })

});