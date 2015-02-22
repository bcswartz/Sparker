module.exports = function( grunt ) {

    var doc = 'Loads the selected spark and codebase into the "app" folder (replacing all current contents.\
            \n--spark: name of the Spark (required).\
            \n--code: name of the code directory in Spark to use (required).\
            \n--force: set to true or just use "--force" (required). Precaution against accidental usage.\
            \n';

    grunt.registerTask( '_loadspark', doc, function() {

        if( grunt.option( 'force' ) ) {
            if ( grunt.option( 'spark' ) && grunt.option( 'code' ) ) {
                grunt.task.run( [
                    'clean:sparkerApp',
                    'clean:sparkerTesting',
                    'clean:sparkerGrunt',
                    'copy:sparkerApp',
                    'copy:sparkerTesting',
                    'copy:sparkerGrunt'
                ]);

                grunt.config( 'sparkerConfig.currentSpark', grunt.option( 'spark' ) + '/' + grunt.option( 'code' ) );
                grunt.Sparker.updateConfigFile( 'sparker' );

            } else {
                grunt.fail.fatal( 'You must select a spark and code with the "spark" and "code" options.' );
            }
        } else {
            grunt.fail.fatal( 'For safety reasons, you must enter "--force" in order to execute this task.');
        }

    });

};