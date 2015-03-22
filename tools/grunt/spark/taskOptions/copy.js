var grunt = require('grunt');
var UtilityFunctions = require( '../UtilityFunctions.js' );
var utilityFunctions;

module.exports = {

    controller: {
        dest: '../app/controllers/<%= grunt.option("name") %>.js',
        options: {
            process: function( content, path ) {
                utilityFunctions = new UtilityFunctions();
                grunt.Sparker.checkConfigSettings( 'spark', [ 'ngapp' ] );
                grunt.Sparker.checkIfFileExists( grunt.task.current.data.dest );
                var di = grunt.option( 'di' ) !== undefined ? grunt.option( 'di' ) : '';
                grunt.option( 'dependencyInjections', utilityFunctions.renderDependencyInjections( di, grunt.option( 'name' ) ) );
                return grunt.template.process( content );
            }
        },
        src: 'grunt/spark/templates/controller'
    },

    directive: {
        dest: '../app/common/<%= grunt.option("name") %>.js',
        options: {
            process: function( content, path ) {
                utilityFunctions = new UtilityFunctions();
                grunt.Sparker.checkConfigSettings( 'spark', [ 'ngapp' ] );
                grunt.Sparker.checkIfFileExists( grunt.task.current.data.dest );
                var di = grunt.option( 'di' ) !== undefined ? grunt.option( 'di' ) : '';
                grunt.option( 'dependencyInjections', utilityFunctions.renderDependencyInjections( di, grunt.option( 'name' ) ) );
                return grunt.template.process( content );
            }
        },
        src: 'grunt/spark/templates/directive'
    },

    pageObject: {
        dest: '../testing/e2e/pageObjects/<%= grunt.option("name") %>.js',
        options: {
            process: function( content, path ) {
                grunt.Sparker.checkIfFileExists( grunt.task.current.data.dest );

                grunt.option( 'route' , grunt.option( 'route' ) !== undefined ? grunt.option( 'route' ) : 'TODO' );
                return grunt.template.process( content );
            }
        },
        src: 'grunt/spark/templates/pageObject'
    },

    protractorTest: {
        dest: '../testing/e2e/testFiles/<%= grunt.option("path") %>/<%= grunt.option("name") %>.js',
        options: {
            process: function( content, path ) {
                grunt.Sparker.checkIfFileExists( grunt.task.current.data.dest );

                var pageObjectString = grunt.option( 'pageObject' ) !== undefined ? grunt.option( 'pageObject' ) : 'TODOPageObject' ;
                var relativeDepth = grunt.option( 'path' ) !== undefined ? grunt.option( 'path' ).split( '/' ).length : 0 ;
                var pageObjectPath = '../';

                grunt.option( 'pageObject', pageObjectString !== undefined ? pageObjectString : 'TODO' );
                grunt.option( 'pageObjectVariable', pageObjectString.charAt( 0 ).toLowerCase() + pageObjectString.slice( 1 ) );

                //Test files live at different folder depths depending on authentication/authorization context, so have to build relative path back to pageObjects folder
                for( var f = 0; f < relativeDepth; f++ ) {
                    pageObjectPath = pageObjectPath + '../'
                }
                pageObjectPath = pageObjectPath + 'pageObjects';
                grunt.option( 'pageObjectPath', pageObjectPath );

                return grunt.template.process( content )
            }
        },
        src: 'grunt/spark/templates/protractorPageTest'
    },

    service: {
        dest: '../app/services/<%= grunt.option("name") %>.js',
        options: {
            process: function( content, path ) {
                utilityFunctions = new UtilityFunctions();
                grunt.Sparker.checkConfigSettings( 'spark', [ 'ngapp' ] );
                grunt.Sparker.checkIfFileExists( grunt.task.current.data.dest );
                var di = grunt.option( 'di' ) !== undefined ? grunt.option( 'di' ) : '';
                grunt.option( 'dependencyInjections', utilityFunctions.renderDependencyInjections( di, grunt.option( 'name' ) ) );
                return grunt.template.process( content );
            }
        },
        src: 'grunt/spark/templates/service'
    },

    unittest: {
        dest: '../testing/unit/<%= grunt.option("name") %>.spec.js',
        options: {
            process: function( content, path ) {
                grunt.Sparker.checkIfFileExists( grunt.task.current.data.dest );

                //Unit tests commonly need access to the controllers and/or services module
                var modules = grunt.option( 'modules' ) !== undefined ? grunt.option( 'modules' ).split( ',' ) : [];
                modules.indexOf( 'controllers' ) > -1 ?
                    grunt.option( 'controllersModule', "module( '" + grunt.config( 'sparkConfig' ).ngapp +  ".controllers', function ( $provide ) {} );" ) :  grunt.option( 'controllersModule', '' );
                modules.indexOf( 'services' ) > -1 ?
                    grunt.option( "servicesModule", "module( '" + grunt.config( 'sparkConfig' ).ngapp +  ".services', function ( $provide ) {} );" ) : grunt.option( 'servicesModule', '' );

                return grunt.template.process( content );
            }
        },
        src: 'grunt/spark/templates/jasmineUnitTest'

    }

}