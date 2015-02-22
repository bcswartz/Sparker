module.exports = function( grunt ) {

    var doc = 'Run all unit tests via Karma.\
            \n';

    grunt.registerTask( 'runkarma', doc, [ 'shell:runKarma' ] );
};