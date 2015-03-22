'use strict';

describe( 'app', function () {
    var $rootScope,
        $location,
        $q,
        $routeChangeStart,
        mockSessionService,
        mockAuthService,
        mockAuthRoles,
        mockExecuteRun;

    beforeEach( function () {

        mockAuthRoles = [ 'sales', 'accounting' ];
        mockExecuteRun = false;

        module( 'firstSpark', function ( $provide ) {
            $provide.constant( 'authRoles', mockAuthRoles );
            $provide.constant( 'executeRun', mockExecuteRun );
        } );

        inject( function ( $injector ) {
            $rootScope = $injector.get( '$rootScope' );
            $location = $injector.get( '$location' );
            $q = $injector.get( '$q' );
            mockSessionService = {
                createSession: function() {} ,
                isUserAuthenticated: function() {}
            };
            mockAuthService = { requestUser: function() {} };
        } );

    });

    describe( '$routeChangeStart' , function() {

        it( 'will not change the route if session not active', function() {
            var targetRoute = '/auth/secret';
            $rootScope.session = { active: false };
            $location.path( targetRoute );
            $rootScope.$broadcast( '$routeChangeStart' );
            expect( $location.path()).toEqual( targetRoute );
        } )

        describe( 'when session.active is true', function() {
            var loginRoute = '/login';
            var unauthorizedRoute = '/unauthorized';

            beforeEach( function() {
                $rootScope.session = { active: true };

            })

            it( 'will not change the route if route does not start with "auth"', function() {
                var targetRoute = '/badSecret';
                $location.path( targetRoute );
                $rootScope.$broadcast( '$routeChangeStart' );
                expect( $location.path()).toEqual( targetRoute );
            })

            it( 'will redirect to login if route starts with "auth" but user undefined', function() {
                var targetRoute = '/auth/goodSecret';
                $location.path( targetRoute );
                $rootScope.$broadcast( '$routeChangeStart' );
                expect( $location.path()).toEqual( loginRoute );
            })

            describe( 'and session.user defined', function() {
                beforeEach( function() {
                    $rootScope.session.user = { roles: [ 'sales', 'hr' ] };
                })

                it( 'will not change the route if no recognized role in the URL', function() {
                    var targetRoute = '/auth/accountView';
                    $location.path( targetRoute );
                    $rootScope.$broadcast( '$routeChangeStart' );
                    expect( $location.path()).toEqual( targetRoute );
                })

                it( 'will redirect to login if user does not have role in URL', function() {
                    var targetRoute = '/auth/accounting/prospects';
                    $location.path( targetRoute );
                    $rootScope.$broadcast( '$routeChangeStart' );
                    expect( $location.path()).toEqual( unauthorizedRoute );
                })

                it( 'will not change the route if user has role in URL', function() {
                    var targetRoute = '/auth/sales/quarterlyReports';
                    $location.path( targetRoute );
                    $rootScope.$broadcast( '$routeChangeStart' );
                    expect( $location.path()).toEqual( targetRoute );
                })
            })
        })

    })

    describe( 'the runApp function', function() {

        var executeRun = true;

        it( 'changes the route to /init', function () {

            spyOn(mockAuthService, 'requestUser').andCallFake(function () {
                var deferred = $q.defer();
                deferred.resolve('');
                return deferred.promise;
            });

            $location.path('/auth/foobar');
            runApp($rootScope, $location, mockSessionService, mockAuthService, mockAuthRoles, executeRun );

            //Can grab the intermediate route before the requestUser returns a result
            expect($location.path()).toEqual( '/init' );
        });

        describe( 'if requestUser returns an error', function() {
            beforeEach( function() {
                spyOn( mockAuthService, 'requestUser').andCallFake( function() {
                    var deferred = $q.defer();
                    deferred.resolve( $q.reject( { data: '' } ) );
                    return deferred.promise;
                });
            })

            it( 'a starting route with "auth" will redirect to the login', function() {
                $location.path('/auth/foobar');
                runApp($rootScope, $location, mockSessionService, mockAuthService, mockAuthRoles, executeRun );
                $rootScope.$digest();
                expect( $location.path()).toEqual( '/login' );
            })

            it( 'a starting route without "auth" will continue to the requested path', function() {
                $location.path('/southwest');
                runApp($rootScope, $location, mockSessionService, mockAuthService, mockAuthRoles, executeRun );
                $rootScope.$digest();
                expect( $location.path()).toEqual( '/southwest' );
            })
        })

        describe( 'if requestUser returns successfully', function() {
            beforeEach( function() {
                spyOn( mockAuthService, 'requestUser').andCallFake( function() {
                    var deferred = $q.defer();
                    deferred.resolve( '' );
                    return deferred.promise;
                });
            })

            it( 'a starting route without "auth" and without an authenticated user will continue to the requested path', function() {
                $location.path( '/northeast' );
                spyOn( mockSessionService, 'isUserAuthenticated').andCallFake( function() { return false } );
                runApp($rootScope, $location, mockSessionService, mockAuthService, mockAuthRoles, executeRun );
                $rootScope.$digest();
                expect( $location.path()).toEqual( '/northeast' );
            })

            it( 'a starting route without "auth" and with an authenticated user will continue to the requested path', function() {
                $location.path( '/southeast' );
                spyOn( mockSessionService, 'isUserAuthenticated').andCallFake( function() { return true } );
                runApp($rootScope, $location, mockSessionService, mockAuthService, mockAuthRoles, executeRun );
                $rootScope.$digest();
                expect( $location.path()).toEqual( '/southeast' );
            })

            it( 'a starting route with "auth" and without an authenticated user will redirect to the login', function() {
                $location.path( '/auth/secretFiles' );
                spyOn( mockSessionService, 'isUserAuthenticated').andCallFake( function() { return false } );
                runApp($rootScope, $location, mockSessionService, mockAuthService, mockAuthRoles, executeRun);
                $rootScope.$digest();
                expect( $location.path()).toEqual( '/login' );
            })

            it( 'a starting route with "auth" and with an authenticated user will continue to the requested path', function() {
                $location.path( '/auth/superSecretFiles' );
                spyOn( mockSessionService, 'isUserAuthenticated').andCallFake( function() { return true } );
                runApp($rootScope, $location, mockSessionService, mockAuthService, mockAuthRoles, executeRun);
                $rootScope.$digest();
                expect( $location.path()).toEqual( '/auth/superSecretFiles' );
            })


        })

    })

});