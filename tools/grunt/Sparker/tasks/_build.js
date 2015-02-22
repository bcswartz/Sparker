module.exports = function( grunt ) {

    var doc = 'Create a build of the application for the specified environment. CSS and JS files tagged properly in the index.html file will be combined in the resulting output.\
            \n--build: name of the build folder/server environment to build for. "test" if not provided.\
            \n--minify: true or false (default), determines if JS code will be compressed.\
            \n--clean: true of false (default), determines if files/folders in environment will be deleted before build.\
            \n';

    grunt.registerTask( '_build', doc, function() {
        var env = grunt.option( 'build' ) !== undefined ? grunt.option( 'build' ) : 'test';
        var minify = grunt.option( 'minify' ) !== undefined ? grunt.option( 'minify' ) : false;
        var clean = grunt.option( 'clean' ) !== undefined ? grunt.option( 'clean' ) : false;
        var configProperty = 'sparkerConfig.' + env + 'Spark';

        grunt.option( 'env', env );

        var buildFiles = grunt.config( 'sparkConfig.buildFiles' ) !== undefined ? grunt.config( 'sparkConfig.buildFiles' ) : [ '**' ];
        grunt.config( "sparkConfig.buildFiles", buildFiles );

        if( clean ) {
            grunt.option( 'force', true );
            grunt.task.run( 'clean:sparkerClearBuild' );
        }

        grunt.task.run ( [
            'copy:sparkerBuild',
            'replace:sparkerGatherResources',
            'concat:sparkerCSS',
            'concat:sparkerJS',
            'replace:sparkerInsert',
            'replace:sparkerComments',
            'replace:sparkerDelete'
        ]);

        if( minify ) {
            grunt.task.run( 'uglify:sparkerBuild' );
        }

        grunt.config( configProperty, grunt.config( 'sparkerConfig.currentSpark' ) );
        grunt.Sparker.updateConfigFile( 'sparker' );

    });

};