'use strict';

angular.module( 'firstSpark.services' )

.factory( 'sessionService', [ '$rootScope', '$location',  function( $rootScope, $location ) {
    //Private methods

    //Public methods
    return {

       revokeAuthentication: function () {
            $rootScope.session = {
                active: true,
                authenticated: false,
                errorMsg: '',
                location: $rootScope.session.location != undefined ? $rootScope.session.location : ''
            };
        },

        createSession: function() {
            $rootScope.session = {
                active: false,
                authenticated: false,
                errorMsg: '',
                location: ''
            };
        },

        activateSession: function() {
            $rootScope.session.active = true;
        },

        setSessionUser: function( userObject ) {
            if( userObject != undefined ) {
                $rootScope.session.user = userObject;
                $rootScope.session.authenticated = true;
            }
        },

        getSessionUser: function() {
            return $rootScope.session.user ? $rootScope.session.user : {}
        },

        isUserAuthenticated: function() {
            return $rootScope.session.user != undefined ? true : false;
        },

        handleNotAuthenticatedResponse: function () {
            this.revokeAuthentication();
            $location.path( '/login' );
        },

        //A CORS (cross-origin resource sharing) error will be returned if the server is unreachable
        handleCORSResponse: function () {
            this.revokeAuthentication();
            $rootScope.session.errorMsg = 'The server did not respond to the previous request.';
            $location.path( '/login' );
        },

        handle500Response: function () {
            $rootScope.session.errorMsg = 'An unexpected error has occurred. Please try again.';
        },

        clearSessionError: function () {
            //Only clear the session error if a location change has taken place.  Allows session error to survive the same
            //error from multiple REST calls occurring when loading a single view.
            if ( $rootScope.session.location != $location.path() ) {
                $rootScope.session.errorMsg = '';
            }
            //Always update the session location
            $rootScope.session.location = $location.path();
        }

    }

}])

