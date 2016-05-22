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
                dest: 'dist/DashPayWallet.js',
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
                    'dist/DashPayWallet.min.js': ['dist/DashPayWallet.js']
                }
            }
        }
    });
}