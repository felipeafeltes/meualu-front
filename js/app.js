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
    'oauthSessionsServices',
    'extraInfosServices',
    'propertiesServices',
    'ngMaterial',
    'scrollToFixed',
    'ngMaterial',
    'slick'
  ]);

app.constant('config', {
  // apiUrl: 'http://localhost:3000/'
  apiUrl: 'http://api.meualu.ubistart.com/'
});

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

app.filter('pluralize', function() {
    return function(input) {
      return (input.charAt(input.length -1) != "#") ? input + 's' : input.slice(0, input.length -1);
    }
});

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, $ocLazyLoadProvider) {

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

  var loginRequired = ['$q', '$state', '$auth', function($q, $state, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $state.go('home');
      console.log('Não autorizado!')
    }
    return deferred.promise;
  }];

  $urlRouterProvider.otherwise('/');

  $authProvider.facebook({
    url: app.config.apiUrl + 'auth/facebook/callback',
    clientId: '914533272017680',
    authorizationEndpoint: 'https://www.facebook.com/v2.6/dialog/oauth',
    baseUrl: app.config.apiUrl
  });

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
      templateUrl: 'views/default_layout.html'
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
      controller: 'PropertiesSearchController',
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/directives/header/header.js');
        }]
      }
    })
    .state('informations', {
      url: '/imovel/informacoes',
      templateUrl: 'views/properties/informations.html',
      controller: 'InformationsController',
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/directives/header/header.js');
        }]
      }
    })
    .state('alu.propertiesDetails', {
      url: '/imoveis/:id',
      templateUrl: 'views/properties/show.html',
      controller: 'PropertiesDetailsController'
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
