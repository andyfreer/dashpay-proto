var packageObject = require('./package.json');

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        combine: {
            single: {
                input: "./src/index.html",
                output: "./build/DashPay.html",
                tokens: [

                    { token: ' src="assets/bootstrap/js/bootstrap.min.js">', string: '><%= grunt.file.read("./src/assets/bootstrap/js/bootstrap.min.js") %>' },

                    // these scripts need file import due to encoding that breaks the string import..
                    { token: ' src="assets/js/jquery.min.js">', string: '>//jquery.min.js' },
                    { token: '//jquery.min.js', file: './src/assets/js/jquery.min.js' },
                    { token: ' src="../../../lib/dashpay-wallet-sdk/build/DashPayWallet.js">', string: '>//DashPayWallet.js' },
                    { token: '//DashPayWallet.js', file: '../../lib/dashpay-wallet-sdk/build/DashPayWallet.min.js' },

                    // css
                    { token: '<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">', string: '<style type="text/css"><%= grunt.file.read("./src/assets/bootstrap/css/bootstrap.min.css") %></style>' },
                    { token: '<link rel="stylesheet" href="assets/css/login.css">', string: '<style type="text/css"><%= grunt.file.read("./src/assets/css/login.css") %></style>' },
                    { token: '<link rel="stylesheet" href="assets/css/page.css">', string: '<style type="text/css"><%= grunt.file.read("./src/assets/css/page.css") %></style>' },
                    { token: '<link rel="stylesheet" href="assets/css/tabs.css">', string: '<style type="text/css"><%= grunt.file.read("./src/assets/css/tabs.css") %></style>' },
                    { token: '<link rel="stylesheet" href="assets/css/text.css">', string: '<style type="text/css"><%= grunt.file.read("./src/assets/css/text.css") %></style>' },
                    { token: '<link rel="stylesheet" href="assets/css/img.css">', string: '<style type="text/css"><%= grunt.file.read("./src/assets/css/img.css") %></style>' },
                    { token: '<link rel="stylesheet" href="assets/css/panel.css">', string: '<style type="text/css"><%= grunt.file.read("./src/assets/css/panel.css") %></style>' },
                    { token: '<link rel="stylesheet" href="assets/css/form.css">', string: '<style type="text/css"><%= grunt.file.read("./src/assets/css/form.css") %></style>' },

                    { token: ' src="js/index.js">', string: '><%= grunt.file.read("./src/js/index.js") %>' },
                    { token: ' src="js/login.js">', string: '><%= grunt.file.read("./src/js/login.js") %>' },
                    { token: ' src="js/signup.js">', string: '><%= grunt.file.read("./src/js/signup.js") %>' },
                    { token: ' src="js/accounts.js">', string: '><%= grunt.file.read("./src/js/accounts.js") %>' },

                    { token: "//version", string: packageObject.version }
                ]
            }
        },
        lineending: {
            dist: {
                options: {
                    eol: 'lf'
                },
                files: {
                    './build/DashPay.html': ['./build/DashPay.html']
                }
            }
        }
    });
    grunt.file.mkdir('./build/');
    grunt.file.defaultEncoding = 'utf-8';
    grunt.loadNpmTasks("grunt-combine");
    grunt.loadNpmTasks('grunt-lineending');
    grunt.registerTask("default", ["combine:single", "lineending"]);
};