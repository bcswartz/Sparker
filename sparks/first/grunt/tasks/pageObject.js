module.exports = function( grunt ) {

    var doc = 'Generate a pageObject file.\
            \n--name: name of file (required)\
            \n--route: Angular route for page view\
            \n';

    grunt.registerTask( 'pageobject', doc, [ 'copy:pageObject' ] );
};