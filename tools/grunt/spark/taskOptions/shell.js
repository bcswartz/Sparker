var grunt = require('grunt');

module.exports = {

    runKarma: {
        command: 'karma start karma.conf.js',
        options: {
            execOptions: {
                cwd: '../testing/config'
            }
        }
    },

    runProtractor: {
        command: function ( suite ) {
            return 'protractor protractor.conf.js --suite=' + suite;
        },
        options: {
            execOptions: {
                cwd: '../testing/config'
            }
        }
    }

}