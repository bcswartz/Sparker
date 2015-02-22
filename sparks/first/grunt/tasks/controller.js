module.exports = function( grunt ) {

    var doc = 'Generate an Angular controller file.\
            \n--name: name of file (required)\
            \n--di: comma-delimited list of objects/functions to be injected (example: $location,accountService)\
            \n';

    grunt.registerTask( 'controller', doc, [ 'copy:controller' ] );
};