var app = angular
  .module('aluFrontApp', [
    'oc.lazyLoad',
    'ui.router',
    'satellizer',
    'nemLogging',
    'uiGmapgoogle-maps',
    'google.places',
    'rzModule',
    'usersSessionServices',
    'propertiesSearchServices',
    'userService',
    'oauthSessionsServices',
    'extraInfosServices',
    'propertiesServices',
    'scheduleVisitsServices',
    'rentalNewsletterServices',
    'contactClientsServices',
    'ngMaterial',
    'scrollToFixed',
    'ngMaterial',
    'slick',
    'ui.bootstrap'
  ]);

app.constant('config', {
  apiUrl: 'https://api.meualu.com/'
  // apiUrl: 'http://localhost:3000/'
});

app.filter('capitalize', function () {
  return function (input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  }
});

app.filter('pluralize', function () {
  return function (input) {
    return (input.charAt(input.length - 1) != "#") ? input + 's' : input.slice(0, input.length - 1);
  }
});

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, $ocLazyLoadProvider) {

  $ocLazyLoadProvider.config({
    events: true
  });

  /**
  * Helper auth functions
  */
  // var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
  //   var deferred = $q.defer();
  //   if ($auth.isAuthenticated()) {
  //     deferred.reject();
  //   } else {
  //     deferred.resolve();
  //   }
  //   return deferred.promise;
  // }];

  var loginRequired = ['$q', '$state', '$auth', function ($q, $state, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $state.go('home');
      console.log('Não autorizado!')
    }
    return deferred.promise;
  }];

$authProvider.facebook({
  url: 'https://api.meualu.com/auth/facebook/callback',
  clientId: '914533272017680',
  authorizationEndpoint: 'https://www.facebook.com/v2.6/dialog/oauth',
  baseUrl: 'https://api.meualu.com/'
});

  $urlRouterProvider.otherwise('/');
  // Utilizando o HTML5 History API
/*   $locationProvider.html5Mode(true); */

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home/home.html',
    })
    .state('template', {
      url: '/template',
      templateUrl: 'index.html',
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
    .state('proprietario', {
      controller: 'ContactClientsController',
      url: '/proprietario',
      templateUrl: 'views/home/proprietario.html'
    })
    .state('properties', {
      url: '/imoveis/:address_string?{filters:json}',
      params: {
        address_string: null,
        filters: {
          value: null,
          squash: true,
        },
        hiddenParam: 'YES'
      },
      templateUrl: 'views/properties/list.html',
      controller: 'PropertiesSearchController',
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/directives/header/header.js');
        }]
      }
    })
    .state('propertiesDetails', {
      url: '/imoveis/detalhes/:id',
      templateUrl: 'views/properties/show.html',
      controller: 'PropertiesDetailsController',
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/directives/header/header.js');
        }]
      }
    })
    .state('perfil', {
      controller: 'profileController',
      url: '/perfil',
      templateUrl: 'views/home/profile.html',
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/directives/header/header.js');
        }]
      }
    })
    .state('editarPerfil', {
      controller: 'editProfileController',
      url: '/perfil/editar',
      templateUrl: 'views/home/edit_profile.html',
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/directives/header/header.js');
        }]
      }
    })
    .state('cadastrarImovel', {
      controller: 'propertyRegistrationController',
      url: '/perfil/novo-imovel',
      templateUrl: 'views/home/property_registration.html',
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/directives/header/header.js');
        }]
      }
    })

  /*     
     .state('admin', {
       url: '/admin',
       templateUrl: 'views/default_layout.html',
     })
     .state('admin.properties', {
       url: '/properties',
       templateUrl: 'views/properties/list.html',
       controller: 'PropertiesListController'
     })
     .state('admin.addProperties', {
       url: '/properties/add',
       templateUrl: 'views/properties/add.html',
       controller: 'PropertiesAddController'
     })
     .state('admin.editProperties', {
       url: '/properties/edit/:id',
       templateUrl: 'views/properties/edit.html',
       controller: 'PropertiesEditController'
     })
     .state('admin.deleteProperties', {
       url: '/properties/delete/:id',
       templateUrl: 'views/properties/delete.html',
       controller: 'PropertiesDeleteController'
     });
  
   */
});
