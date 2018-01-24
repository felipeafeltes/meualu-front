module.exports = function (grunt) {
    //grunt wrapper function 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /*         ngAnnotate: {
                    options: {
                        singleQuotes: true
                    },
                    app: {
                        files: {
                            './js/controllers/profile/editProfileController.js': ['./public/js/appFactory.js'],
                        }
                    }
                }, */
        concat: {
            js: { //target
                src: ['./public/min-safe/app.js', './public/min-safe/js/*.js'],
                dest: './dist/min/app.js'
            }
        },
        uglify: {
            js: { //target
                files: {
                    'build/min/app.min.js': ['.js/app.js']
                }
            }
        }
    });

    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    /*     grunt.loadNpmTasks('grunt-ng-annotate'); */

    //register grunt default task
    grunt.registerTask('default', ['concat', 'uglify']);
}