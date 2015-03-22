'use strict';

angular.module( 'firstSpark.controllers' )
    .controller( 'logoutController', logoutController );

function logoutController( $location, authService ) {
    authService.performLogout().then(
        function( response ) {
            $location.path( '/home' );
        },
        function( response ) {
            $location.path( '/logoutError' );
        }
    )
}

logoutController.$inject = [ '$location', 'authService' ];