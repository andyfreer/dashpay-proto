module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.registerTask('default', ['browserify']);
    grunt.registerTask('default', ['browserify', 'uglify']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            main: {
                src: [],
                dest: 'build/DashPayWallet.js',
                options: {
                    require: [
                        './index.js:DashPayWallet',
                        '../dashpay-lib'
                    ]
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/DashPayWallet.min.js': ['build/DashPayWallet.js']
                }
            }
        }
    });
}