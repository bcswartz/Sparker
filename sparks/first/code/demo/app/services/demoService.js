'use strict';

angular.module( 'firstSpark.services' )

.factory( 'demoService', [ '$http',  function( $http ) {
    //Public methods
    return {
        getProspects: function() {
            var request = $http( {
                method: 'GET',
                url: '/mockGetProspects',
                withCredentials: true
            })
                .success( function( response ) {
                    return response;
                })
                .error( function( response ) {
                    return response;
                });

            return ( request );
        },

        getProspect: function( prospectId ) {
            var request = $http( {
                method: 'GET',
                url: '/mockGetProspect',
                data: { prospectId: prospectId },
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
                .success( function( response ) {
                    return response;
                })
                .error( function( response ) {
                    return response;
                });


            return ( request );
        },

        getClients: function() {
            var request = $http( {
                method: 'GET',
                url: '/mockGetClients',
                withCredentials: true
            })
                .success( function( response ) {
                    return response;
                })
                .error( function( response ) {
                    return response;
                });

            return ( request );
        }
    }

}]);