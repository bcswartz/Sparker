'use strict';

angular.module( 'firstSpark.controllers' )

.controller( 'logoutController', [ 'authService', '$location', function( authService, $location ) {

    authService.performLogout().then(
        function( response ) {
            $location.path( '/home' );
        },
        function( response ) {
            $location.path( '/logoutError' );
        }
    )

}]);