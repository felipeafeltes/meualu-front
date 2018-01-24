module.exports = function (grunt) {
    //grunt wrapper function 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.dist/*'
                    ]
                }]
            }
        },
        less: {
            development: {
                files: {
                    "./dist/css/app.css": "./assets/*.css"
                }
            },
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    "./dist/css/app.css": "./assets/*.css"
                }
            }
        },
        concat: {
            js: {
                files: {
                    './dist/min/min.js': ['./js/controllers/**/*.js'],
                    './dist/min/directives.js': ['./js/directives/**/*.js'],
                    './dist/min/services.js': ['./js/services/**/*.js'],
                }
            }
        },
        uglify: {
            js: {
                src: ['./dist/min/app.js'],
                dest: './dist/main.js'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    useShortDoctype: true,
                    collapseWhitespace: true,
                    removeEmptyAttributes: true,
                    removeCDATASectionsFromCDATA: true
                },
                files: [{
                    expand: true,
                    src: ['./views/*.html'],
                    dest: './dist/views'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './*',
                    dest: './dist',
                    src: [
                        '*.html',
                        '*.{ico,txt}',
                        '.htaccess',
                        //'components/**/*',
                        'img/{,*/}*.{gif,webp}',
                        'css/fonts/*'
                    ]
                }]
            }
        },

    });
    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //register grunt default task
    grunt.registerTask('build', ['concat']);
    grunt.registerTask('min', ['uglify']);


    // Default task.
    grunt.registerTask('build', [
        'clean:dist',
        'less:production',
        'concat',
        'cssmin',
        'copy',
        'uglify',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', ['build']);
}