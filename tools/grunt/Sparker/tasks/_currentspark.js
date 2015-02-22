module.exports = function( grunt ) {

    var doc = 'Returns the name of the spark codebase currently in use / currently in the "app" folder\
            \n';

    grunt.registerTask( '_currentspark', doc, function() {
        grunt.log.write( 'The "' + grunt.config( 'sparkerConfig.currentSpark' ) + '" is the currently active spark codebase in the "app" folder.' );
    });

};