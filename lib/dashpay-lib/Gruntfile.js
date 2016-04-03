module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['browserify']);

    // Uglify only needed with standalone Dashpay-lib builds, as the wallet SDK uglifies for the client build
    //grunt.registerTask('default', ['browserify', 'uglify']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            main: {
                src: [],
                dest: 'build/DashPayLib.js',
                options: {
                    require: [
                        './index.js:DashPayLib',
                        'bitcore-lib-dash',
                        'bitcore-ecies-dash',
                        'bitcore-mnemonic-dash',
                        'bitcore-message-dash'
                    ]
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/DashPayLib.min.js': ['build/DashPayLib.js']
                }
            }
        }
    });
}