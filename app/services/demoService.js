'use strict';

angular.module( 'firstSpark.services' )
    .factory( 'demoService', demoService );

function demoService( $http ) {
    var service = {
        getProspects: getProspects,
        getProspect: getProspect,
        getClients: getClients
    };

    return service;

    function getProspects() {
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
    }

    function getProspect( prospectId ) {
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
    }

    function getClients() {
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

demoService.$inject = [ '$http' ];