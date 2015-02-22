var grunt = require('grunt');

module.exports = {


    sparkerComments: {
        files: [
            {
                cwd: '../builds/<%=grunt.option("env") %>/',
                dest: '../builds/<%=grunt.option("env") %>/',
                expand: true,
                src: [ '**' ]
            }
        ],
        options: {
            patterns: [
                {
                    match: /\<\!\-\-\s?spark\-comment\:.*\-\-\>/g,
                    replacement: ''
                },
                {
                    match: /\/\/\s?spark\-comment\:.*/g,
                    replacement: ''
                }
            ]
        }
    },

    sparkerDelete: {
        files: [
            {
                cwd: '../builds/<%=grunt.option("env") %>/',
                dest: '../builds/<%=grunt.option("env") %>/',
                expand: true,
                src: [ '**' ]
            }
        ],
        options: {
            patterns: [
                {
                    match: /\<\!\-\-spark\-delete[\s\S]*spark\-delete\-\-\>/,
                    replacement: ''
                }
            ]
        }

    },

    sparkerGatherResources: {
        files: [
            {
                cwd: '../builds/<%=grunt.option("env") %>/',
                dest: '../builds/<%=grunt.option("env") %>/',
                expand: true,
                src: [ 'index.html' ]
            }
        ],
        options: {
            patterns: [
                {
                    match: /\<\!\-\-spark\-js[\s\S]*spark\-js\-\-\>/,
                    replacement: function ( matchedString ) {
                        var jsArray = matchedString.match( /(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g );
                        jsArray.forEach( function( element ) {
                            var resourceTarget = element.match( /(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/ )[ 2 ];
                            targetConfig = grunt.config( 'sparkerConfig' ).jsResources;
                            targetConfig.push( '../app/' + resourceTarget );
                            grunt.config( 'sparkerConfig.jsResources', targetConfig );
                        });

                        return '<!--spark-insert:js-->';
                    }
                },
                {
                    match: /\<\!\-\-spark\-css[\s\S]*spark\-css\-\-\>/,
                    replacement: function ( matchedString ) {
                        var cssArray = matchedString.match( /(href\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g );
                        cssArray.forEach( function( element ) {
                            var resourceTarget = element.match( /(href\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/ )[ 2 ];
                            targetConfig = grunt.config( 'sparkerConfig' ).cssResources;
                            targetConfig.push( '../app/' + resourceTarget );
                            grunt.config( 'sparkerConfig.cssResources', targetConfig );
                        });

                        return '<!--spark-insert:css-->';
                    }
                }
            ]
        }

    },

    sparkerInsert: {  //Finds <!--build-insert:css --> and <!--build-insert:js--> blocks and targets them for replacement
        files: [
            {
                cwd: '../builds/<%=grunt.option("env") %>/',
                dest: '../builds/<%=grunt.option("env") %>/',
                expand: true,
                src: [ 'index.html' ]
            }
        ],
        options: {
            patterns: [
                {
                    match: /\<\!\-\-\s?spark\-insert:\w*\s?\-\-\>/g,
                    replacement: function ( matchedString ) {
                        var insertType = matchedString.match( /(insert:)(\w*)([\s\-])/ )[ 2 ];
                        switch( insertType ) {

                            case 'css':
                                return '<link rel="stylesheet" media="screen" href="' + grunt.config("sparkerConfig").masterCSSFilename + '"/>';
                                break;

                            case 'js':
                                return '<script type="text/javascript" src="' + grunt.config("sparkerConfig").masterJSFilename + '"></script>';
                                break;

                        }

                    }
                }
            ]
        }
    }
}