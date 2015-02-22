module.exports = function( grunt ) {

    var doc = 'Open the documentation HTML for Sparker \
            \n';

    grunt.registerTask( '_opendocs', doc, [ 'open:sparkerOpenDocs' ] );

};