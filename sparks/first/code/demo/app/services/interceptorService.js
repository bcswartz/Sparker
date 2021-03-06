'use strict';

angular.module( 'firstSpark.services' )
    .config( [ '$httpProvider', function ( $httpProvider ) {
        $httpProvider.interceptors.push( 'httpInterceptors' );
    }] )

    .factory( 'httpInterceptors', httpInterceptors );

function httpInterceptors( $rootScope, $q, sessionService ) {
    var service = {
        request: request,
        response: response,
        responseError: responseError
    };

    return service;

    function request( config ) {
        //spark-comment: The $rootScope.session requirement prevents the need for dealing with _timestamp in unit test httpBackend requests
        if ( $rootScope.session && config.method === 'GET' && config.url.indexOf( '.html' ) === -1 ) {
            var sep = config.url.indexOf( '?' ) === -1 ? '?' : '&';
            config.url = config.url + sep + '_timestamp=' + new Date().getTime();
        }
        return config;
    }

    function response( response ) {
        //spark-comment: The $rootScope.session requirement allows unit tests to bypass actions affecting the $rootScope
        if ( $rootScope.session ) {
            sessionService.clearSessionError();
        }
        return response;
    }

    function responseError( response ) {
        //spark-comment: The $rootScope.session requirement allows unit tests to bypass actions affecting only the $rootScope
        if ( $rootScope.session ) {
            sessionService.clearSessionError();
        }

        var responseData = response.data !== undefined ? angular.copy( response.data ) : {};
        response.data = {};
        response.data.errors = responseData.errors !== undefined ? responseData.errors : responseData;
        response.data.httpStatusCode = response.status !== undefined ? response.status : 400;
        if ( $rootScope.session ) {
            switch ( response.data.httpStatusCode ) {
                case 403:
                    sessionService.handleNotAuthenticatedResponse();
                    break;
                case 0:
                    sessionService.handleCORSResponse();
                    break;
                case 500:
                    sessionService.handle500Response();
                    break;
            }
        }
        return $q.reject( response );
    }

}

httpInterceptors.$inject = [ '$rootScope', '$q', 'sessionService' ];