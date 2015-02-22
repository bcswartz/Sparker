module.exports = function( grunt ) {

    var doc = 'Open instance of the app in development browser per properties in sparkerConfig.json file.\
            \n--build: build to open. Defaults to "app" if not specified\
            \n';

    grunt.registerTask( '_openbuild', doc, [ 'open:sparkerOpenBuild' ] );

};