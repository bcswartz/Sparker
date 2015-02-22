'use strict';
//spark-comment: Need mockServices to provide the mock data
angular.module( 'firstSpark.controllers', [] );
angular.module( 'firstSpark.services', [] );
angular.module( 'firstSpark.mockServices', [] );

angular.module( 'firstSpark', [
    'firstSpark.controllers',
    'firstSpark.services',
    'firstSpark.mockServices',
    'ngRoute',
    'ngAria'
])

//spark-comment: user authentication roles in the application
.constant( 'authRoles', [ 'sales', 'accounting' ] )

.config( [ '$routeProvider', function( $routeProvider ) {

        $routeProvider.
            when( '/home', {
                templateUrl: 'views/home.html'
            }).
            when( '/init', {
                templateUrl: 'views/init.html'
            }).
            when( '/login', {
                templateUrl: 'views/login.html',
                controller: 'loginController as vm'
            }).
            when( '/logout', {
                templateUrl: 'views/init.html',
                controller: 'logoutController as vm'
            }).
            when( '/unauthorized', {
                templateUrl: 'views/unauthorized.html'
            }).
            when( '/auth/authorized', {
                templateUrl: 'views/authorized.html'
            }).
            when( '/auth/sales/salesPage', {
                templateUrl: 'views/sales.html',
                controller: 'salesController as vm'
            }).
            when( '/auth/sales/prospect/:prospectId', {
                templateUrl: 'views/prospect.html',
                controller: 'prospectController as vm'
            }).
            when( '/auth/accounting/accountingPage', {
                templateUrl: 'views/accounting.html',
                controller: 'accountingController as vm'
            }).
            when( '/auth/userAccount', {
                templateUrl: 'views/userAccount.html',
                controller: 'userAccountController as vm'
            }).
            otherwise({
                redirectTo: '/home'
            });

}])

.run( [ '$rootScope', '$location', 'sessionService', 'authService', 'authRoles', function( $rootScope, $location, sessionService, authService, authRoles ) {

    //spark-comment: Get the route provide by the user
    var startingRoute = $location.path();
    //spark-comment: create session construct
    sessionService.createSession();
    //spark-comment: Redirect to the init route while processing the startingRoute request
    $location.path( '/init' );
    //spark-comment: Regardless of the route, we want to check if the user is authenticated
    authService.requestUser().then(
        function( success ) {
           if( startingRoute.split( '/' )[1] == 'auth' && !sessionService.isUserAuthenticated ) {
                $location.path( '/login' );
           } else {
                $location.path( startingRoute );
           }
        },
        function( errorResponse ) {
            //spark-comment: Not authenticated or server unreachable.  If startingRoute requires authentication , send to login route.
            if( startingRoute.split( '/' )[1] == 'auth') {
                $location.path( '/login' );
            } else {
                $location.path( startingRoute );
            }
        }

    )

    $rootScope.$on( '$routeChangeStart', function ( event, next, current ) {
        if( $rootScope.session.active ) {
            var targetRoute = $location.path();
            if( targetRoute.split( '/' )[1] == 'auth' ) {
                var routeRole = targetRoute.split( '/' ).length > 2 ? targetRoute.split( '/' )[2] : '';

                //spark-comment: Authentication conventions:
                //spark-comment: 1) {destinationRoute} : route that does not require authentication
                //spark-comment: 2) /auth/{destinationRoute} : route that requires authentication but route is either available to all authenticated users or authorization check is handled by route controller
                //spark-comment: 3) /auth/{routeRole}/{destinationRoute} : route that requires authentication and checks authorization by role if routeRole is a recognized authRole
               if( $rootScope.session.user == undefined ) {
                   $location.path( '/login' );
               } else if ( routeRole && authRoles.indexOf( routeRole ) > -1 && $rootScope.session.user.roles.indexOf( routeRole ) == -1 ) {
                   $location.path( '/unauthorized' );
               }
            }
        }
    });

 }])

