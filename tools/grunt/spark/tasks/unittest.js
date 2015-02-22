module.exports = function( grunt ) {

    var doc = 'Generate a Jasmine unit test.\
            \n--name: name of file (required)\
            \n--modules: comma-delimited list of app modules (example: controllers,services)\
            \n';

    grunt.registerTask( 'unittest', doc, [ 'copy:unittest' ] );
};