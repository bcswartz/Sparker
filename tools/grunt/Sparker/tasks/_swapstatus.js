module.exports = function( grunt ) {

    var doc = 'Reports if you currently have one spark codebase swapped for another\
            \n';

    grunt.registerTask( '_swapstatus', doc, function() {
        if( grunt.file.exists( 'swap' ) && grunt.config( 'sparkerConfig.swappedSpark' ) != null ) {
            grunt.log.write( 'You currently have the "' + grunt.config( 'sparkerConfig.swappedSpark' ) + '" spark codebase swapped out for "' + grunt.config( 'sparkerConfig.currentSpark' ) + '" (currently in app).' );
        } else {
            grunt.log.write( 'No swap in effect' );
        }
    });

};