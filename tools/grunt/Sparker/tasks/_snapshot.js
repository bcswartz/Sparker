module.exports = function( grunt ) {

    var doc = 'Generate a snapshot backup of current files in app and testing folders. Will make additional "latest" snapshot. \
            \n--name: adds name to timestamped snapshot and puts snapshot in "named" folder instead of "dated"\
            \n--withtasks: true or false (default), determines if will include tools/grunt/spark contents in snapshot in a "grunt" folder\
            \n';

    grunt.registerTask( '_snapshot', doc, function() {
        var timestamp = + new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + +new Date().getDate() + '.' + new Date().getTime();
        var withtasks = grunt.option( 'withtasks' ) !== undefined ? grunt.option( 'withtasks' ) : false;

        if( grunt.option( 'name' ) != undefined ) {
            grunt.option( 'snapTag', 'named' );
            grunt.option( 'snapFolder', grunt.option( 'name' ) + '.' + timestamp );
        } else {
            grunt.option( 'snapTag', 'dated' );
            grunt.option( 'snapFolder', timestamp );
        }

        if( withtasks ) {
            grunt.option( 'gruntSrc', '**/*' );
        } else {
            grunt.option( 'gruntSrc', '!**/*' );
        }

        grunt.task.run( [
            'copy:sparkerSnapshot',
            'clean:sparkerLatestSnapshot',
            'copy:sparkerLatestSnapshot'
        ]);

    });

};