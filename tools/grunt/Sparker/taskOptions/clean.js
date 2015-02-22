var grunt = require('grunt');

module.exports = {

    sparkerApp: {
        dot: true, //include "." files like ".bowerrc"
        src: [ '../app/**/*' ]
    },

    sparkerClearBuild: {
        dot: true,
        src: [ '../builds/<%=grunt.option("env") %>/**/*' ]
    },

    sparkerClearSnapshots: {
        filter: function( filepath ) {
            //Excludes snapshots/protected folder from the task
            return ( filepath.split( '\\' )[ 1 ] !== 'protected' )
        },
        src: [ 'snapshots/**/*' ]
    },

    sparkerGrunt: {
        dot: true,
        src: [ 'grunt/spark/**/*' ]
    },

    sparkerLatestSnapshot: {
        dot: true,
        src: [ 'snapshots/latest/**/*' ]
    },

    sparkerSwap: {
        dot: true,
        src: [ 'swap' ]
    },

    sparkerTesting: {
        dot: true,
        src: [ '../testing/**/*' ]
    }


}