'use strict';

angular.module( 'firstSpark' )
    .config( configRoutes )

function configRoutes( $routeProvider ) {

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
        otherwise({
            redirectTo: '/home'
        });

}

configRoutes.$inject = [ '$routeProvider' ];