'use strict';

angular.module( 'firstSpark.services' )

.factory( 'authService', [ '$http', 'sessionService',  function( $http, sessionService ) {
    //Private methods go here

    //Public methods
    return {

        performLogin: function( userLogin ) {
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
        },

        performLogout: function() {
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
        },

        requestUser: function() {

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

        },

        getSessionUser: function() {
            return sessionService.getSessionUser();
        }

    }

}]);