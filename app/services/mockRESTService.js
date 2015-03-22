'use strict';

angular.module( 'firstSpark.mockServices', [
    'ngMockE2E'
] )
    .config( configure )
    .run( createMockRESTResponses )
    .constant( 'mockResponses', {
        mockLogin: {
            salesGuy: {
                id: 1,
                username: 'salesGuy',
                password: 'Password1',
                firstName: 'Johnny',
                lastName: 'Slick',
                email: 'salesGuy@foobar.com',
                roles: [ 'sales' ],
                statusCode: 200
            },
            beanCounter: {
                id: 2,
                username: 'beanCounter',
                password: 'Password1',
                firstName: 'Reginald',
                lastName: 'Math',
                email: 'beanCounter@foobar.com',
                roles: [ 'accounting' ],
                statusCode: 200
            },
            admin: {
                id: 3,
                username: 'admin',
                password: 'Password1',
                firstName: 'Roger',
                lastName: 'Big Kahuna',
                email: 'admin@foobar.com',
                roles: [ 'sales', 'accounting' ],
                statusCode: 200
            },
            noRoles: {
                id: 4,
                username: 'noRoles',
                password: 'Password1',
                firstName: 'Ben',
                lastName: 'Casselope',
                email: 'noroles@foobar.com',
                roles: [],
                statusCode: 200
            },
            error: {
                id: 5,
                username: 'error',
                password: 'Password1',
                firstName: 'Oops',
                lastName: 'Notgood',
                email: 'error@foobar.com',
                roles: [],
                statusCode: 500
            }
        },
        mockProspects: [
            { id: 1, fullName: 'Lost Authentication', phone: '888-555-0001', email: 'unknown@gmail.com', address: 'Nowhere, Dundalk, MD 20400' },
            { id: 2, fullName: 'Bob Frankel', phone: '888-555-3145', email: 'bfrank@gmail.com', address: '211 Brandon Street, Annapolis, MD 20887' },
            { id: 3, fullName: 'Deborah Horning', phone: '888-555-9879', email: 'debhorn@gmail.com', address: '34 Ace Avenue, Annapolis, MD 20887' },
            { id: 4, fullName: 'Sasha Lattimer', phone: '888-555-7681', email: 'saslat@gmail.com', address: '67 Junction Road, Baltimore, MD 20115' },
            { id: 5, fullName: 'Harold Nuremburg', phone: '888-555-0861', email: 'harryN@gmail.com', address: '11A West 34 Ave, Baltimore, MD 20116' },
            { id: 6, fullName: 'Betty Risling', phone: '888-555-5123', email: 'brise@gmail.com', address: '2331 Cherry Lane, Dundalk, MD 20400' }
        ],
        mockClients: [
            { id: 821, name: 'Atlas Holdings', income: 4500000, expenditures: 2300000 },
            { id: 34, name: 'Mountain High Systems', income: 4150000, expenditures: 3400000 },
            { id: 567, name: 'Glitter Glass', income: 3800500, expenditures: 3500000 },
            { id: 788, name: 'Melantory Incorporated', income: 3800000, expenditures: 3590000 },
            { id: 513, name: 'Roundel Marketing', income: 5145000, expenditures: 4950000 }
        ]
     })


function configure( $httpProvider ) {
    $httpProvider.interceptors.push( delayResponse );
}

function delayResponse( $q, $timeout ) {
    var service = { response: response };
    return service;

    function response( response ) {
        var deferred = $q.defer();
        if( response.config.url.indexOf('views') == 0) return response; //Let through views immediately

        //Fake delay on response
        $timeout(function () {
            deferred.resolve(response);
        }, 500);

        return deferred.promise;
    }
}

function createMockRESTResponses( $httpBackend, $timeout, mockResponses ) {
    //GET requests will have the timestamp appended
    $httpBackend.whenGET( /(\/mockRequestUser\?_timestamp\=).*/ ).respond( function( method, url, data, headers ) {
        return [ 200, { data: {} }, {} ];
    })

    $httpBackend.whenPOST( '/mockPerformLogin' ).respond( function( method, url, data, headers ) {

        var mockResult,
            postData = JSON.parse( data );

        if( mockResponses.mockLogin[ postData.username ] != undefined && mockResponses.mockLogin[ postData.username ].password == postData.password ) {
            if( mockResponses.mockLogin[ postData.username ].statusCode == 200 ) {
                mockResult = {
                    user: {
                        id: mockResponses.mockLogin[ postData.username ].id,
                        firstName: mockResponses.mockLogin[ postData.username ].firstName,
                        lastName: mockResponses.mockLogin[ postData.username ].lastName,
                        email: mockResponses.mockLogin[ postData.username ].email,
                        roles: mockResponses.mockLogin[ postData.username ].roles
                    },
                    authenticated: true
                }
            } else {
                mockResult = { error: 'An error occurred during login. Please try again.' };
            }

            return [ mockResponses.mockLogin[ postData.username ].statusCode, mockResult, {} ];
        } else {
            //Username/password combination does not match a user
            return [ 200, { authenticated: false }, {} ];
        }

    })

    $httpBackend.whenPOST( '/mockPerformLogout' ).respond( function( method, url, data, headers ) {
        return [ 200, {}, {} ];
    })


    $httpBackend.whenPOST( '/mockSaveAccountChanges' ).respond( function( method, url, data, headers ) {
        var mockResult,
            errors = {},
            postData = JSON.parse( data );

        if( !postData.firstName ) {
            errors.firstName = [ { message: 'You must provide a first name.' } ]
        }

        if ( !postData.lastName ) {
            errors.lastName = [
                { message: 'You must provide a last name.' },
                { message: 'Seriously, did you think this would be allowed?' }
            ]
        }

        if ( !postData.email ) {
            errors.email = [ { message: 'You must provide an email address.' } ]
        } else if ( postData.email.indexOf( '@' ) == -1 ) {
            errors.email = [ { message: 'The email address you provided is invalid.' } ]
        }

        //Note: Object.keys not supported in IE 7/8
        if( Object.keys(errors).length ) {
            return [ 400, errors, {} ]
        } else {
            return [ 200, true, {} ]
        }

    })

    $httpBackend.whenGET( /(\/mockGetProspects\?_timestamp\=).*/ ).respond( function( method, url, data, headers ) {
        return [ 200, mockResponses.mockProspects, {} ];
    })

    $httpBackend.whenGET( /(\/mockGetProspect\?_timestamp\=).*/ ).respond( function( method, url, data, headers ) {
        var mockResult,
            postData = JSON.parse( data );

        if( parseInt( postData.prospectId ) == 1 ) {
            //Simulate an authentication error / session timeout
            return [ 403, {}, {} ];
        }  else {
            //Return the prospect data
            mockResult = mockResponses.mockProspects[ ( parseInt( postData.prospectId ) - 1 ) ];
            return [ 200, mockResult, {} ];
        }


    })

    $httpBackend.whenGET(/(\/mockGetClients\?_timestamp\=).*/).respond( function( method, url, data, headers ) {
        var clientsWithProfit = [];
        angular.forEach( mockResponses.mockClients, function ( client ) {
            client.profit = client.income - client.expenditures;
            clientsWithProfit.push( client );
        })
        return [ 200, clientsWithProfit, {} ];
    })

    //Any request that doesn't match one of the $httpBackend conditions above will simply be passed through
    $httpBackend.whenGET(/\/*/).passThrough();

}

delayResponse.$inject = [ '$q', '$timeout' ];
configure.$inject = [ '$httpProvider' ];
createMockRESTResponses.$inject = [ '$httpBackend', '$timeout', 'mockResponses' ];