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
            expect( $route.routes[ '/auth/sales/prospect/:prospectId' ].templateUrl ).toEqual( 'views/prospect.html' );
        } )

        it( 'and unrecognized route redirects to "/home" route', function() {
            expect( $route.routes[ null ].redirectTo ).toEqual( '/home' );
        })

    })

    describe( 'route execution', function() {
        it( 'should handle parameters', function() {
            //Set to the HTML file retrieved by the route, not the route URL
            $httpBackend.expectGET( 'views/prospect.html' ).respond( 200 );
            $location.path( '/auth/sales/prospect/2' );
            $rootScope.$digest();
            //NOTE: Despite being an "auth" route, this works because $rootScope.session = false
            expect( $route.current.controller ).toEqual( 'prospectController as vm' );
        })
    })

});