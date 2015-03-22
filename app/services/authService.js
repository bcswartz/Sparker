'use strict';

angular.module( 'firstSpark.services' )
    .factory( 'authService', authService );

function authService( $http, sessionService ) {
    var service = {
        performLogin: performLogin,
        performLogout: performLogout,
        requestUser: requestUser,
        getSessionUser: getSessionUser,
        saveAccountChanges: saveAccountChanges
    };

    return service;

    function performLogin( userLogin ) {
        var request = $http( {
            method: 'POST',
            url: '/mockPerformLogin',
            data: userLogin,
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
            url: '/mockPerformLogout'
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
            url: '/mockRequestUser',
            withCredentials: true
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

    function saveAccountChanges( userAccount ) {
        var request = $http( {
            method: 'POST',
            url: '/mockSaveAccountChanges',
            data: userAccount,
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
            .success( function( response ) {
                var sessionUser = sessionService.getSessionUser();
                sessionUser.firstName = userAccount.firstName;
                sessionUser.lastName = userAccount.lastName;
                sessionUser.email= userAccount.email;
                return true;
            })
            .error( function( response ) {
                return response;
            });

        return ( request );
    }
}

authService.$inject = [ '$http', 'sessionService' ];