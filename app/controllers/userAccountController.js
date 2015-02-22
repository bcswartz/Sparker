'use strict';

angular.module( 'firstSpark.controllers' )

.controller( 'userAccountController', [ 'authService',  function( authService ) {
    var vm = this;
    vm.uiState = { sending: false, success: false };

    vm.account = angular.copy( authService.getSessionUser() );
    vm.errors = {};

    vm.saveChanges = function() {
        vm.errors = {};
        vm.uiState = { sending: true, success: false };
        authService.saveAccountChanges( vm.account ).then(
            function( response ) {
                vm.uiState = { sending: false, success: true };
            },
            function( response ) {
                vm.errors = response.data.errors;
                vm.uiState.sending = false;
            }
        );
    }
}]);