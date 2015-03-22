'use strict';

/*
 Testing every route is a bit extreme, so just test that routes work in general and your "otherwise" route goes to the right
 place.  Can also use this to test the syntax of a specific route that isn't working as expected.
 */

describe( 'routes', function () {
    var $rootScope,
        $route,
        $location,
        $httpBackend;

    beforeEach( function () {
        module( 'firstSpark', function ( $provide ) {} );

        inject( function ( $injector ) {
            $rootScope = $injector.get( '$rootScope' );
            $route = $injector.get( '$route' );
            $location = $injector.get( '$location' );
            $httpBackend = $injector.get( '$httpBackend' );
        } );

    });

    describe( 'routes configured' , function() {
        it( 'and are registered in $route.routes', function() {
            expect( $route.routes[ '/home' ].templateUrl ).toEqual( 'views/home.html' );
            expect( $route.routes[ '/login' ].templateUrl ).toEqual( 'views/login.html' );
            expect( $route.routes[ '/login' ].controller ).toEqual( 'loginController as vm' );
        } )

        it( 'and unrecognized route redirects to "/home" route', function() {
            expect( $route.routes[ null ].redirectTo ).toEqual( '/home' );
        })

    })

    describe( 'route execution', function() {
        it( 'should handle parameters', function() {
            //Test a route with one or more parameters
            //$httpBackend.expectGET( 'views/recordDetail.html' ).respond( 200 );
            //$location.path( '/recordDetail/2' );
            //$rootScope.$digest();
            //expect( $route.current.controller ).toEqual( 'recordDetailController as vm' );
        })
    })

});