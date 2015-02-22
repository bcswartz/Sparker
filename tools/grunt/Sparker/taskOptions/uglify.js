var grunt = require('grunt');

module.exports = {

    sparkerBuild: {
        files: {
            '../builds/<%=grunt.option("env") %>/<%= grunt.config("sparkerConfig").masterJSFilename %>': [ '../builds/<%=grunt.option("env") %>/<%= grunt.config("sparkerConfig").masterJSFilename %>' ]
        },
        options: {
            mangle: false
        }
    }

}