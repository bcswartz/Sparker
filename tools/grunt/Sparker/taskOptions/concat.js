var grunt = require('grunt');

module.exports = {

    sparkerCSS: {
        dest: '../builds/<%=grunt.option("env") %>/<%= grunt.config("sparkerConfig").masterCSSFilename %>',
        src: [ '<%= sparkerConfig.cssResources %>' ]
    },

    sparkerJS: {
        dest: '../builds/<%=grunt.option("env") %>/<%= grunt.config("sparkerConfig").masterJSFilename %>',
        options: {
            separator: ';'
        },
        src: [ '<%= sparkerConfig.jsResources %>' ]
    }

}