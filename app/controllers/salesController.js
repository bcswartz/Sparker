'use strict';

angular.module( 'firstSpark.controllers')

.controller( 'salesController', [ 'demoService',  function( demoService ) {
   var vm = this;
   vm.uiState = { pageLoaded: false };

    demoService.getProspects().then(
        function( response ) {
            vm.prospects = response.data;
            vm.uiState.pageLoaded = true;
        }
    );


 }]);