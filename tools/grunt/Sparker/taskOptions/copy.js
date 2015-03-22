var grunt = require('grunt');

module.exports = {

    sparkerApp: {
        files: [
            {
                cwd: '../sparks/<%= grunt.option( "spark" ) %>/code/<%= grunt.option( "code" ) %>/app/',
                dest: '../app/',
                dot: true,
                expand: true,
                src: [ '**' ]
            }
        ]
    },

    sparkerBuild: {
        files: [
            {
                cwd: '../app/',
                dest: '../builds/<%=grunt.option("env") %>/',
                expand: true,
                src: [ '<%= sparkConfig.buildFiles %>' ]
            }
        ]
    },

    sparkerAppToSwap: {
        files: [
            {
                cwd: '../app/',
                dest: 'swap/app/',
                dot: true,
                expand: true,
                src: [ '**' ]
            }
        ]
    },

    sparkerGrunt: {
        files: [
            {
                cwd: '../sparks/<%= grunt.option( "spark" ) %>/grunt/',
                dest: 'grunt/spark/',
                dot: true,
                expand: true,
                src: [ '**' ]
            }
        ]
    },

    sparkerGruntToSwap: {
        files: [
            {
                cwd: 'grunt/spark/',
                dest: 'swap/grunt/',
                dot: true,
                expand: true,
                src: [ '**' ]
            }
        ]
    },

    sparkerLatestSnapshot: {
        files: [
            {
                cwd: '../',
                dest: 'snapshots/latest/<%= grunt.option("snapFolder") %>/',
                dot: true,
                expand: true,
                src: [ 'app/**', 'testing/**' ]
            },
            {
                cwd: '../tools/grunt/spark/',
                dest: 'snapshots/latest/<%= grunt.option("snapFolder") %>/grunt/',
                dot: true,
                expand: true,
                src: [ '<%= grunt.option("gruntSrc") %>' ]
            }
        ]
    },

    sparkerSnapshot: {
        files: [
            {
                cwd: '../',
                dest: 'snapshots/<%= grunt.option("snapTag") %>/<%= grunt.option("snapFolder") %>/',
                dot: true,
                expand: true,
                src: [ 'app/**', 'testing/**' ]
            },
            {
                cwd: '../tools/grunt/spark/',
                dest: 'snapshots/<%= grunt.option("snapTag") %>/<%= grunt.option("snapFolder") %>/grunt/',
                dot: true,
                expand: true,
                src: [ '<%= grunt.option("gruntSrc") %>' ]
            }
        ]
    },

    sparkerSwapToApp: {
        files: [
            {
                cwd: 'swap/app/',
                dest: '../app/',
                dot: true,
                expand: true,
                src: [ '**' ]
            }
        ]
    },

    sparkerSwapToGrunt: {
        files: [
            {
                cwd: 'swap/grunt/',
                dest: 'grunt/spark/',
                dot: true,
                expand: true,
                src: [ '**' ]
            }
        ]
    },

    sparkerSwapToTesting: {
        files: [
            {
                cwd: 'swap/testing/',
                dest: '../testing/',
                dot: true,
                expand: true,
                src: [ '**' ]
            }
        ]
    },

    sparkerTesting: {
        files: [
            {
                cwd: '../sparks/<%= grunt.option( "spark" ) %>/code/<%= grunt.option( "code" ) %>/testing/',
                dest: '../testing/',
                dot: true,
                expand: true,
                src: [ '**' ]
            }
        ]
    },

    sparkerTestingToSwap: {
        files: [
            {
                cwd: '../testing/',
                dest: 'swap/testing/',
                dot: true,
                expand: true,
                src: [ '**' ]
            }
        ]
    }

}