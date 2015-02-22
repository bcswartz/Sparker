module.exports = function( grunt ) {

    var doc = 'Generate an Angular directive file.\
            \n--name: name of file (required)\
            \n--di: comma-delimited list of objects/functions to be injected (example: $location,accountService)\
            \n';

    grunt.registerTask( 'directive', doc, [ 'copy:directive' ] );
};