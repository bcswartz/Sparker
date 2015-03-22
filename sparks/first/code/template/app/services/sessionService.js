'use strict';

angular.module( 'firstSpark.services' )
    .factory( 'sessionService', sessionService );

function sessionService( $rootScope, $location ) {
    var service = {
        revokeAuthentication: revokeAuthentication,
        createSession: createSession,
        activateSession: activateSession,
        setSessionUser: setSessionUser,
        getSessionUser: getSessionUser,
        isUserAuthenticated: isUserAuthenticated,
        handleNotAuthenticatedResponse: handleNotAuthenticatedResponse,
        handleCORSResponse: handleCORSResponse,
        handle500Response: handle500Response,
        clearSessionError: clearSessionError
    };

    return service;

    function revokeAuthentication() {
        $rootScope.session = {
            active: true,
            authenticated: false,
            errorMsg: '',
            location: $rootScope.session.location != undefined ? $rootScope.session.location : ''
        };
    }

    function createSession() {
        $rootScope.session = {
            active: false,
            authenticated: false,
            errorMsg: '',
            location: ''
        };
    }

    function activateSession() {
        $rootScope.session.active = true;
    }

    function setSessionUser( userObject ) {
        if( userObject != undefined ) {
            $rootScope.session.user = userObject;
            $rootScope.session.authenticated = true;
        }
    }

    function getSessionUser() {
        return $rootScope.session.user ? $rootScope.session.user : {};
    }

    function isUserAuthenticated() {
        return $rootScope.session.user != undefined ? true : false;
    }

    function handleNotAuthenticatedResponse() {
        this.revokeAuthentication();
        $location.path( '/login' );
    }

    //A CORS (cross-origin resource sharing) error will be returned if the server is unreachable
    function handleCORSResponse() {
        this.revokeAuthentication();
        $rootScope.session.errorMsg = 'The server did not respond to the previous request.';
        $location.path( '/login' );
    }

    function handle500Response() {
        $rootScope.session.errorMsg = 'An unexpected error has occurred. Please try again.';
    }

    function clearSessionError() {
        //Only clear the session error if a location change has taken place.  Allows session error to survive the same
        //error from multiple REST calls occurring when loading a single view.
        if ( $rootScope.session.location != $location.path() ) {
            $rootScope.session.errorMsg = '';
        }
        //Always update the session location
        $rootScope.session.location = $location.path();
    }

};

sessionService.$inject = [ '$rootScope', '$location' ];