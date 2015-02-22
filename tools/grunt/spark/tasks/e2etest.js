module.exports = function( grunt ) {

    var doc = 'Generate a Protractor file.\
             \n--name: name of file (required)\
             \n--path: folder position (example: authenticated/admin)\
             \n--pageObject: name of main pageObject\
             \n';

    grunt.registerTask( 'e2etest', doc, [ 'copy:protractorTest' ] );
};