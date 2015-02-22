'use strict';

angular.module( 'firstSpark.controllers' )

.controller( 'loginController', [ 'authService', '$location',  function( authService, $location ) {
    var vm = this;
        
    vm.uiState = {
        sending: false
    };

    vm.userLogin = {
        username: '',
        password: ''
    };

    vm.performLogin = function() {

        vm.uiState.sending = true;
        authService.performLogin( vm.userLogin ).then(
            function( response ) {
                //REST call may not error but could denote failed login
                if( response.data.authenticated ) {
                    vm.uiState.sending = false;
                    $location.path( '/auth/authorized' );
                } else {
                    vm.error = 'Sorry, there is no user with that username and password.';
                    vm.uiState.sending = false;
                }

            },
            function( errorResponse ) {
                vm.error = errorResponse.data.error;
                vm.uiState.sending = false;
            }
        )

    }

}]);