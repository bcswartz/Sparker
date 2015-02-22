module.exports = function( grunt ) {

    var doc = 'First time run, puts app and testing files in temp location while copying code from selected Spark codebase. Run a second time to swap back.\
            \n--spark: name of the Spark. Required first time task is invoked, rejected while code lives in the swap directory.\
            \n--code: name of the code directory in Spark to use. Required first time task is invoked, rejected while code lives in the swap directory.\
            \n';

    grunt.registerTask( '_swap', doc, function() {
        grunt.option( 'force', true );
        if( ( grunt.option( 'spark' ) || grunt.option( 'code' ) ) && grunt.file.exists( 'swap' ) ) {
            grunt.fail.fatal( 'You have already swapped the contents of the app folder with a spark codebase.  Use "grunt sparkerswap" with no spark or codebase name to swap back.' );
        } else if ( ( !grunt.option( 'spark' ) || !grunt.option( 'code' ) ) && !grunt.file.exists( 'swap' ) ) {
            grunt.fail.fatal( 'You must select a spark and code with the "spark" and "code" options to start the swap.' );
        } else {
            if( grunt.option( 'spark' ) && grunt.option( 'code' ) ) {
                grunt.task.run( [
                    'copy:sparkerAppToSwap',
                    'copy:sparkerTestingToSwap',
                    'copy:sparkerGruntToSwap',
                    'clean:sparkerApp',
                    'clean:sparkerTesting',
                    'copy:sparkerApp',
                    'copy:sparkerTesting',
                    'copy:sparkerGrunt'
                ]);

                grunt.config( 'sparkerConfig.swappedSpark', grunt.config( 'sparkerConfig.currentSpark' ) );
                grunt.config( 'sparkerConfig.currentSpark', grunt.option( 'spark' ) + '/' + grunt.option( 'code' ) );
                grunt.Sparker.updateConfigFile( 'sparker' );

            } else {
                grunt.task.run( [
                    'clean:sparkerApp',
                    'clean:sparkerTesting',
                    'clean:sparkerGrunt',
                    'copy:sparkerSwapToApp',
                    'copy:sparkerSwapToTesting',
                    'copy:sparkerSwapToGrunt',
                    'clean:sparkerSwap'
                ]);

                grunt.config( 'sparkerConfig.currentSpark', grunt.config( 'sparkerConfig.swappedSpark' ) );
                grunt.config( 'sparkerConfig.swappedSpark', null );
                grunt.Sparker.updateConfigFile( 'sparker' );

            }
        }
    });

};