module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            main: {
                src: 'index.js',
                dest: 'build/DashPayCheckout.js',
                options: {
                    browserifyOptions: {
                        standalone: grunt.file.readJSON('package.json').name
                    }
                }
            }
        }
    });
};