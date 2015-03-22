module.exports = function( config ) {
    config.set( {
        basePath : '../..',

        files : [
            'testing/packages/angular/angular.js',
            'testing/packages/angular-mocks/angular-mocks.js',
            'testing/packages/angular-resource/angular-resource.js',
            'testing/packages/angular-route/angular-route.js',
            'testing/packages/angular-aria/angular-aria.js',
            'app/common/**/*.js',
            'app/controllers/**/*.js',
            'app/services/**/*.js',
            'testing/unit/**/*.js'
        ],

        autoWatch : true,

        reporters: [ 'progress' ],

        frameworks: [ 'jasmine' ],

        browsers : [ 'Chrome' ],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ]

})}
