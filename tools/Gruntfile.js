module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var config = {};

    function loadConfig( path ) {
        var glob = require( 'glob' );
        var object = {};
        var key;

        glob.sync('*', {cwd: path}).forEach(function(option) {
            key = option.replace(/\.js$/,'');
            object[key] = require(path + option);
        });

        return object;
    }

    var SparkerTaskConfigs = loadConfig( './grunt/Sparker/taskOptions/' );
    var sparkTaskConfigs = loadConfig( './grunt/spark/taskOptions/' );

    function collectConfig( configObject ) {
        Object.getOwnPropertyNames( configObject ).forEach( function( task ) {

            if( config[ task ] == undefined ) {
                config[ task ] = {};
            }

            Object.getOwnPropertyNames( configObject[ task ] ).forEach( function( target ) {
                config[ task ][ target ] = configObject[ task ][ target ];
            });

        });
    }

    collectConfig( SparkerTaskConfigs );
    collectConfig( sparkTaskConfigs );

    config.sparkerConfig = grunt.file.readJSON( './grunt/Sparker/sparkerConfig.json' );
    if( grunt.file.exists( './grunt/spark/sparkConfig.json' ) ) {
        config.sparkConfig = grunt.file.readJSON( './grunt/spark/sparkConfig.json' );
    }

    grunt.initConfig(config);

    //console.log(config);

    grunt.loadTasks('./grunt/Sparker/tasks');
    grunt.loadTasks('./grunt/spark/tasks');

    this.Sparker = {
        checkConfigSettings: function( configName, configPropertyArray ) {
            var allowedToBeBlank = [];
            var configSet = configName + 'Config';
            for (var p = 0; p < configPropertyArray.length; p++) {
                var currentProperty = configPropertyArray[ p ];
                if (grunt.config( configSet )[ currentProperty ] === undefined || ( grunt.config( configSet )[ currentProperty ] == '' && allowedToBeBlank.indexOf(currentProperty) < 0 )) {
                    grunt.fail.fatal(currentProperty + ' property in ' + configSet + '.json file must be set to a valid value.');
                }
            }
        },
        checkIfFileExists: function ( filePath ) {
            if( grunt.file.exists( filePath ) ) {
                var pathArray= filePath.split( '/' );
                var fileName = pathArray[ pathArray.length - 1 ];
                grunt.fail.fatal( 'A file named "' + fileName + '" already exists for that directory/type of file.');
            }
        },
        updateConfigFile: function( configName ) {
            var configObject = configName + 'Config';
            var configFolder = configName == 'sparker' ? 'Sparker' : 'spark';
            var configFile = './grunt/' + configFolder + '/' + configObject + '.json';
            grunt.file.write( configFile, JSON.stringify( grunt.config(configObject), null, 2 ) );
        }
    };

};