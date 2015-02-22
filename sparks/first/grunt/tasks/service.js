module.exports = function( grunt ) {

    var doc = 'Generate an Angular service file.\
            \n--name: name of file (required)\
            \n--di: comma-delimited list of objects/functions to be injected (example: $location,accountResource)\
            \n';

    grunt.registerTask( 'service', doc, [ 'copy:service' ] );
};