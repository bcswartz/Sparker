module.exports = function( grunt ) {

    var doc = 'Remove all snapshot folders except for any in the "snapshots/protected" folder\
            \n--force: set to true or just use "--force" (required). Precaution against accidental usage.\
            \n';

    grunt.registerTask( '_clearsnapshots', doc, function() {
        if( grunt.option( 'force' ) ) {
            grunt.task.run( 'clean:sparkerClearSnapshots' );
        } else {
            grunt.fail.fatal( 'For safety reasons, you must enter "grunt sparkerclearsnapshots --force" in order to execute this task.');
        }
    });

};