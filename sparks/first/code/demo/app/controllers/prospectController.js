'use strict';

angular.module( 'firstSpark.controllers' )
    .controller( 'prospectController', prospectController );

function prospectController( $routeParams, demoService ) {
    var vm = this;

    demoService.getProspect( $routeParams.prospectId ).then(
        function( response ) {
            vm.prospect = response.data;
        }
    );
}

prospectController.$inject = [ '$routeParams', 'demoService' ];