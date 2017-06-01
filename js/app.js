var app = angular
  .module('aluFrontApp', [
    'ui.router',
    'usersSessionServices',
    'propertiesSearchServices',
    'oauthSessionsServices'
  ]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('template', {
      url: '/template',
      templateUrl: 'index.html',
    })
    .state('home', {
      url: '/',
      templateUrl: 'views/home/home.html',
    })
    .state('sign_in', {
      url: '/sign_in',
      controller: 'UserSessionsSignIn'
    })
    .state('sign_out', {
      url: '/sign_out',
      controller: 'UserSessionsSignOut'
    })
    .state('oauth_autenticate', {
      url: '/authenticate',
      controller: 'OauthSessionsAuthenticate'
    })
    .state('alu', {
      url: '/alu',
      templateUrl: 'views/default_layout.html',
    })
    .state('alu.properties', {
      url: '/imoveis/:address_string?{filters:json}',
      params: {
        filters: {
          value: null,
          squash: true,
        },
        hiddenParam: 'YES'
      },
      templateUrl: 'views/properties/list.html',
      controller: 'PropertiesSearchController'
    });
    // .state('admin', {
    //   url: '/admin',
    //   templateUrl: 'views/layout.html',
    // })
    // .state('admin.properties', {
    //   url: '/properties',
    //   templateUrl: 'views/properties/list.html',
    //   controller: 'PropertiesListController'
    // })
    // .state('admin.addProperties', {
    //   url: '/properties/add',
    //   templateUrl: 'views/properties/add.html',
    //   controller: 'PropertiesAddController'
    // })
    // .state('admin.editProperties', {
    //   url: '/properties/edit/:id',
    //   templateUrl: 'views/properties/edit.html',
    //   controller: 'PropertiesEditController'
    // })
    // .state('admin.deleteProperties', {
    //   url: '/properties/delete/:id',
    //   templateUrl: 'views/properties/delete.html',
    //   controller: 'PropertiesDeleteController'
    // })

    // Utilizando o HTML5 History API
    $locationProvider.html5Mode(true);
});
