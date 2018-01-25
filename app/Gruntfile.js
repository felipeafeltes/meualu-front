module.exports = function (grunt) {
    //grunt wrapper function 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dir: {
            app: './app',
            dist: './dist'
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= dir.dist %>/*'
                    ]
                }]
            }
        },
        cssmin: {
            development: {
                options: {
                    yuicompress: true
                },
                files: {
                    "<%= dir.dist %>/assets/styles.css": "./assets/*.css"
                }
            },
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    "<%= dir.dist %>/assets/app.css": "<%= dir.app %>/assets/*.css"
                }
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/index.html']
        },
        concat: {
            js: {
                files: {
                    '<%= dir.dist %>/js/controllers.js': ['./js/controllers/**/*.js'],
                    '<%= dir.dist %>/js/directives.js': ['./js/directives/**/*.js'],
                    '<%= dir.dist %>/js/services.js': ['./js/services/**/*.js'],
                    '<%= dir.dist %>/js/app.js': ['./js/app.js'],
                    '<%= dir.dist %>/js/app.js': ['./js/ angular-locale_pt-br'],
                   
                }
            }
        },
        uglify: {
            js: {
                files: {
                    //'<%= dir.dist %>/js/controllers.js': ['<%= dir.dist %>/js/controllers.js'],
                    '<%= dir.dist %>/js/directives.js': ['<%= dir.dist %>/js/directives.js'],
                    '<%= dir.dist %>/js/services.js': ['<%= dir.dist %>/js/services.js'],
                    '<%= dir.dist %>/js/app.js': ['<%= dir.dist %>/js/app.js'],
                    '<%= dir.dist %>/js/app.js': ['<%= dir.dist %>/js/ angular-locale_pt-br'],
                }
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
                    src: ['./views/**/*.html'],
                    dest: '<%= dir.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    dest: '<%= dir.dist %>',
                    src: [
                        '*.html',
                        '*.{ico,txt}',
                        '.htaccess',
                        'assets/imagens/{,*/}*.*',
                        'assets/fonts/**/*',
                        'assets/font-awesome-4.7.0/**/*',
                        'assets/bootstrap/**/*',
                        'assets/OwlCarousel2-2.2.1/**/*',
                        'assets/**/*.js',
                        'node_modules/**/*',
                        'bower_components/**/*'
                    ]
                }]
            }
        },

    });
    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-usemin');
    //register grunt default task
    grunt.registerTask('build', [
        'clean:dist',
        'copy',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'usemin',
        'htmlmin'
    ]);



}