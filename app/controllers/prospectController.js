'use strict';

angular.module( 'firstSpark.controllers' )

.controller( 'prospectController', [ 'demoService', '$routeParams',  function( demoService, $routeParams ) {
    var vm = this;

    demoService.getProspect( $routeParams.prospectId ).then(
        function( response ) {
            vm.prospect = response.data;
        }
    );
}]);