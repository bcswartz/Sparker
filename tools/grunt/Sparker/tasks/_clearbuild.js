module.exports = function( grunt ) {

    var doc = 'Delete all directories in a build. Optional subtask of "build" task.\
            \n--build: name of environment to clear. "test" if not provided.\
            \n';

    grunt.registerTask( '_clearbuild', doc, function() {
        var env = grunt.option( 'build' ) != undefined ? grunt.option( 'build' ) : 'test';
        grunt.option( 'env', env );
        grunt.option( 'force', true );
        grunt.task.run( 'clean:sparkerClearBuild' );
    });

};