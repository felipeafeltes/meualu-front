'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        'angular-builder': {
            options: {
                mainModule: 'aluFrontApp',
                externalModules: [
                    'angular.viacep',
                    'oc.lazyLoad',
                    'ui.router',
                    'satellizer',
                    'nemLogging',
                    'uiGmapgoogle-maps',
                    'google.places',
                    'rzModule',
                    'usersSessionServices',
                    'myPropertiesService',
                    'propertiesSearchServices',
                    'userService',
                    'oauthSessionsServices',
                    'extraInfosServices',
                    'propertiesServices',
                    'searchPropertiesServices',
                    'scheduleVisitsServices',
                    'rentalNewsletterServices',
                    'contactClientsServices',
                    'ngMaterial',
                    'scrollToFixed',
                    'ngMaterial',
                    'slick',
                    'ui.bootstrap',
                    'angular-img-cropper',
                    'td.easySocialShare',
                    'angularUtils.directives.dirPagination',
                    'infinite-scroll'
                ],
            },
            app: {
                src: ['js/**/*.js','js/*.js', 'js/controllers/*.js'],
                dest: 'build/main.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-angular-builder');
    grunt.registerTask('release', ['angular-builder']);
    grunt.registerTask('debug', ['angular-builder::debug']);

};