module.exports = function( grunt ) {

    var docs = {
        unauthenticated:    'Run Protractor tests in the unauthenticated suite\
                            \n',

        authenticated:      'Run Protractor tests in the authenticated suite\
                            \n',

        sales:              'Run Protractor tests in the authenticated/sales suite\
                            \n',

        accounting:         'Run Protractor tests in the authenticated/accounting suite\
                            \n',

        admin:              'Run Protractor tests in the authenticated/admin suite\
                            \n'
    };

    grunt.registerTask( 'runprotractor-unauth', docs.unauthenticated, [ 'shell:runProtractor:unauthenticated' ] );
    grunt.registerTask( 'runprotractor-auth', docs.authenticated, [ 'shell:runProtractor:authenticated' ] );
    grunt.registerTask( 'runprotractor-sales', docs.sales, [ 'shell:runProtractor:sales' ] );
    grunt.registerTask( 'runprotractor-accounting', docs.accounting, [ 'shell:runProtractor:accounting' ] );
    grunt.registerTask( 'runprotractor-admin', docs.admin, [ 'shell:runProtractor:admin' ] );


};