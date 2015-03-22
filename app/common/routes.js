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

}

configRoutes.$inject = [ '$routeProvider' ];