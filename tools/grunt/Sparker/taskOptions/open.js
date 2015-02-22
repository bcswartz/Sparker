var grunt = require('grunt');

module.exports = {

    sparkerOpenBuild: {
        app: '<%= grunt.config("sparkerConfig").projectWebBrowser %>',
        path: function() {
            grunt.Sparker.checkConfigSettings( 'sparker', [ 'projectUrl', 'projectWebBrowser' ] );
            var build = grunt.option( 'build' ) !== undefined ? grunt.option( 'build' ) : 'app';
            if( build === 'app' ) {
                return grunt.config( 'sparkerConfig' ).projectUrl + '/app/index.html';
            } else {
                return grunt.config( 'sparkerConfig' ).projectUrl + '/builds/' + build + '/index.html';
            }
        }
    },

    sparkerOpenDocs: {
        app: '<%= grunt.config("sparkerConfig").projectWebBrowser %>',
        path: function() {
            grunt.Sparker.checkConfigSettings( 'sparker', [ 'projectUrl', 'projectWebBrowser' ] );
            return grunt.config( 'sparkerConfig' ).projectUrl + '/docs/index.html';
        }
    },

    sparkerOpenSparkDocs: {
        app: '<%= grunt.config("sparkerConfig").projectWebBrowser %>',
        path: function() {
            grunt.Sparker.checkConfigSettings( 'sparker', [ 'projectUrl', 'projectWebBrowser' ] );
            if( !grunt.option( 'spark' ) ) {
                grunt.fail.fatal( 'You must provide the "spark" option to select which spark documentation to open.' );
            } else {
                return grunt.config( 'sparkerConfig' ).projectUrl + '/sparks/' + grunt.option( 'spark' ) + '/docs/index.html';
            }
        }
    }

}