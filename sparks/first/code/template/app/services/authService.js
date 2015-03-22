'use strict';

angular.module( 'firstSpark.services' )
    .factory( 'authService', authService );

function authService( $http, sessionService ) {
    var service = {
        performLogin: performLogin,
        performLogout: performLogout,
        requestUser: requestUser,
        getSessionUser: getSessionUser
    };

    return service;

    function performLogin( userLogin ) {
        var request = $http( {
            method: 'POST',
            url: 'performLogin REST call',  //spark-comment: TODO Provide URL to endpoint that authenticates user and sends back user object
            data: usernameAndPassword,
            headers: { 'Content-Type': 'application/json' }
        })
            .success( function( response ) {
                sessionService.setSessionUser( response.user );
                return response;
            })
            .error( function( response ) {
                return response;
            });

        return ( request );
    }

    function performLogout() {
        var request = $http( {
            method: 'POST',
            url: 'performLogout REST call' //spark-comment: TODO provide URL to endpoint that performs logout
        })
            .success( function( response ) {
                //Reset the session
                sessionService.createSession();
                return response;
            })
            .error( function( response ) {
                return response;
            });

        return ( request );
    }

    function requestUser() {
        var request = $http( {
            method: 'GET',
            url: 'requestUser REST call', //spark-comment: TODO provide URL to endpoint that sends back user object based on authentication cookie
            withCredentials: true  //spark-comment: This setting tells Angular to send authentication token cookie (if one exists) to the server
        })
            .success( function( response ) {
                if( response.user != undefined ) {
                    sessionService.setSessionUser( response.user );
                }
                sessionService.activateSession();
            })

            .error( function( errorResponse ) {
                sessionService.activateSession();
            })

        return ( request );
    }

    function getSessionUser() {
        return sessionService.getSessionUser();
    }

}

authService.$inject = [ '$http', 'sessionService' ];
