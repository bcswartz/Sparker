module.exports = function( grunt ) {

    var doc = 'Open the documentation HTML for a particular Spark \
            \n--spark: name of the spark (required)\
            \n';

    grunt.registerTask( '_opensparkdocs', doc, [ 'open:sparkerOpenSparkDocs' ] );

};