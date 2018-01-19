var app = angular
  .module('aluFrontApp', [
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
  ]);

app.constant('config', {
  apiUrl: 'https://api.meualu.com/'
  /* apiUrl: 'http://meualuapi.brazilsouth.cloudapp.azure.com/' */

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

  $authProvider.facebook({
    url: 'https://api.meualu.com/auth/facebook/callback',
    clientId: '914533272017680',
    authorizationEndpoint: 'https://www.facebook.com/v2.6/dialog/oauth',
    baseUrl: 'https://api.meualu.com/'
  });

  /*   $authProvider.facebook({
      url: 'http://meualuapi.brazilsouth.cloudapp.azure.com/auth/facebook/callback',
      clientId: '914533272017680',
      authorizationEndpoint: 'https://www.facebook.com/v2.6/dialog/oauth',
      baseUrl: 'http://meualuapi.brazilsouth.cloudapp.azure.com'
    }); */

  $authProvider.google({
    url: 'http://meualuapi.brazilsouth.cloudapp.azure.com/auth/google/callback',
    clientId: '1083734615013-3bff0193jcdueh30bimq5coekmoiec1d.apps.googleusercontent.com',
    baseUrl: 'http://meualuapi.brazilsouth.cloudapp.azure.com'
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
    .state('registerUser', {
      controller: 'UserSessionsRegister',
      url: '/register',
      templateUrl: 'views/home/register_user.html',
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/directives/header-property/header-property.js'),
            $ocLazyLoad.load('js/directives/footer/footer.js')
        }]
      }
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
      templateUrl: 'views/home/proprietario.html',
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/directives/header-property/header-property.js'),
            $ocLazyLoad.load('js/directives/footer/footer.js')
        }]
      }
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
          return $ocLazyLoad.load('js/directives/header-property/header-property.js'),
            $ocLazyLoad.load('js/directives/footer/footer.js')
        }]
      }
    })
    .state('propertiesDetails', {
      url: '/imoveis/detalhes/:id',
      templateUrl: 'views/properties/show.html',
      controller: 'PropertiesDetailsController',
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/directives/header-property/header-property.js'),
            $ocLazyLoad.load('js/directives/footer/footer.js')
        }]
      }
    })
    //AGENDAMENTO
    .state('scheduling', {
      url: '/imoveis/agendar/:id',
      templateUrl: 'views/properties/schedulingProperty.html',
      controller: 'schedulingController',
      resolve: {
        deps: [
          '$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load('js/directives/header-property/header-property.js'),
              $ocLazyLoad.load('js/directives/footer/footer.js')
          }
        ],
      }
    })
    .state('perfil', {
      controller: 'profileController',
      url: '/perfil',
      templateUrl: 'views/profile/profile.html',
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load('js/directives/header-property/header-property.js'),
            $ocLazyLoad.load('js/directives/footer/footer.js')
        }]
      },
      protected: true

    })
    .state('perfil.info', {
      controller: 'myInfosProfileController',
      url: '/info',
      templateUrl: 'views/profile/profile_info.html',
      protected: true
    })
    .state('perfil.editar', {
      controller: 'editProfileController',
      url: '/editar',
      templateUrl: 'views/profile/edit_profile.html',
      protected: true
    })

    .state('perfil.scheduleds', {
      controller: 'ScheduledController',
      url: '/visitas',
      templateUrl: 'views/profile/scheduledVisits.html',
      protected: true
    })

    //CADASTRO DE IMOVEL
    .state('perfil.cadastrarImovel', {
      controller: 'propertyRegistrationController',
      url: '/novo-imovel',
      templateUrl: 'views/profile/property_registration/property_registration.html',
      protected: true
    })
    .state('perfil.cadastrarImovel.address', {
      url: '/endereco',
      templateUrl: 'views/profile/property_registration/property_registration_adress.html',
      protected: true,
      processed: true
    })
    .state('perfil.cadastrarImovel.details', {
      url: '/detalhes',
      templateUrl: 'views/profile/property_registration/property_registration_details.html',
      protected: true,
      processed: true
    })
    .state('perfil.cadastrarImovel.images', {
      url: '/fotos',
      templateUrl: 'views/profile/property_registration/property_registration_images.html',
      protected: true,
      processed: true
    })

    .state('perfil.cadastrarImovel.rental', {
      url: '/aluguel',
      templateUrl: 'views/profile/property_registration/property_registration_rental.html',
      protected: true,
      processed: true
    })
    .state('perfil.cadastrarImovel.advertisement', {
      url: '/anuncio',
      templateUrl: 'views/profile/property_registration/property_registration_advertisement.html',
      protected: true,
      processed: true
    })
    .state('perfil.cadastrarImovel.terms', {
      url: '/termos',
      templateUrl: 'views/profile/property_registration/property_registration_terms.html',
      protected: true,
      processed: true
    })

    //ADMIN
    .state('admin', {
      url: '/admin',
      templateUrl: 'views/default_layout.html',
      protected: true
    })
    .state('admin.properties', {
      url: '/properties',
      templateUrl: 'views/properties/list.html',
      controller: 'PropertiesListController',
      protected: true
    })
    .state('admin.addProperties', {
      url: '/properties/add',
      templateUrl: 'views/properties/add.html',
      controller: 'PropertiesAddController',
      protected: true
    })
    .state('admin.editProperties', {
      url: '/properties/edit/:id',
      templateUrl: 'views/properties/edit.html',
      controller: 'PropertiesEditController',
      protected: true
    })
    .state('admin.deleteProperties', {
      url: '/properties/delete/:id',
      templateUrl: 'views/properties/delete.html',
      controller: 'PropertiesDeleteController',
      protected: true
    });


});

app.run(function ($transitions, $state, $rootScope, MySelf) {

  $rootScope.processedAddress = false;
  $rootScope.processedImages = false;
  $rootScope.processedAdvertisement = false;
  $rootScope.processedRental = false;
  $rootScope.processedDetails = false;
  $rootScope.processedTerms = false;

  if (localStorage.getItem('token')) {
    //DADOS DO USUARIOO
    MySelf.get(
      {},
      function (data) {
        $rootScope.current_user = data.renter;
        ($rootScope.current_user.birthday !== null) ? $rootScope.current_user.birthday = new Date(data.renter.birthday) : '';
      },
    );
  }

  //TRATAMENTO DE ROTAS
  $transitions.onBefore({}, function (transition) {
    if (transition.to().protected && !localStorage.getItem('token')) {
      toastr.error("Não foi possível acessar sem estar autenticado.");
      $state.go('home');
      return false;
    }

    //Wizard Cadastro de Imovel caso f5 na pagina
    if (transition.to().processed) {
      switch (transition.to().name) {
        case 'perfil.cadastrarImovel.details':
          if (!$rootScope.processedAddress) {
            return $state.target('perfil.cadastrarImovel.address');
          }
          break;
        case 'perfil.cadastrarImovel.advertisement':
          if (!$rootScope.processedAddress ||
            !$rootScope.processedDetails) {
            return $state.target('perfil.cadastrarImovel.address');
          }
          break;
        case 'perfil.cadastrarImovel.rental':
          if (!$rootScope.processedAddress ||
            !$rootScope.processedDetails ||
            !$rootScope.processedAdvertisement) {
            return $state.target('perfil.cadastrarImovel.address');
          }
          break;
        case 'perfil.cadastrarImovel.images':
          if (
            !$rootScope.processedAddress ||
            !$rootScope.processedDetails ||
            !$rootScope.processedAdvertisement ||
            !$rootScope.processedRental) {
            return $state.target('perfil.cadastrarImovel.address');
          }
          break;
        case 'perfil.cadastrarImovel.terms':
          if (!$rootScope.processedAddress ||
            !$rootScope.processedDetails ||
            !$rootScope.processedAdvertisement ||
            !$rootScope.processedRental ||
            !$rootScope.processedImages) {
            return $state.target('perfil.cadastrarImovel.address');
          }
          break;
      }

    }

  });

});