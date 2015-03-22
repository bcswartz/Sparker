'use strict';

angular.module( 'firstSpark.controllers' )
    .controller( 'accountingController', accountingController );

function accountingController ( demoService ) {
    var vm = this;
    vm.uiState = { pageLoaded: false };

    demoService.getClients().then(
        function( response ) {
            vm.clients = response.data;
            vm.uiState.pageLoaded = true;
        }
    );
}

accountingController.$inject = [ 'demoService' ];