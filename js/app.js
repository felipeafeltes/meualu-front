
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
    'extraInfosServices',
    'propertiesServices',
    'searchPropertiesServices',
    'scheduleVisitsServices',
    'rentalNewsletterServices',
    'contactClientsServices',
    'scrollToFixed',
    'ngMaterial',
    'slick',
    'ui.bootstrap',
    'angular-img-cropper',
    'ngImgCrop',
    'td.easySocialShare',
    'angularUtils.directives.dirPagination',
    'infinite-scroll',
    'similarPropertyService',
    'ui.utils.masks',
    'ngAccountKit',
    'verifyService'
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



app.config(function (
  $stateProvider,
  $urlRouterProvider,
  $locationProvider,
  $authProvider,
  $ocLazyLoadProvider,
  accountKitProvider,
  config
) {

  $ocLazyLoadProvider.config({
    events: true
  });

  accountKitProvider.configure("914533272017680", "v1.0", "{{csrf}}");

  $authProvider.facebook({
    url: config.apiUrl + 'auth/facebook/callback',
    clientId: '914533272017680',
    authorizationEndpoint: 'https://www.facebook.com/v2.6/dialog/oauth',
    baseUrl: config.apiUrl
  });

  $authProvider.google({
    url: config.apiUrl + 'auth/google/callback',
    clientId: '961442445641-s1tpnabddkm0m1djhpcu2s46di8s5qsi.apps.googleusercontent.com',
    baseUrl: config.apiUrl,
    headers: {
      'teste': 'teste'
    }
  });

  $urlRouterProvider.otherwise('/');
  // Utilizando o HTML5 History API
  /*   $locationProvider.html5Mode(true); */



  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home/home.html',
      resolve: {
        deps: [
          '$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load('js/directives/footer/footer.js')
          }
        ],
      }
    })
    .state('recover', {
      url: '/recuperar/:token',
      templateUrl: 'views/home/recover_user.html',
      controller: 'UserRecoverPassword',
      resolve: {
        deps: [
          '$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load('js/directives/footer/footer.js')
          }
        ],
      }
    })
    .state('confirmation', {
      url: '/confirmacao',
      controller: 'UserConfirm',
      templateUrl: 'views/home/confirmationAccount.html',
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

    .state('perfil.scheduleds.landlord', {
      controller: 'ScheduledControllerLandlord',
      url: '/propostas',
      templateUrl: 'views/profile/scheduledVisitsLandlord.html',
      protected: true
    })

    .state('perfil.scheduleds.renter', {
      controller: 'ScheduledControllerRenter',
      url: '/quero',
      templateUrl: 'views/profile/scheduledVisitsRender.html',
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
    $rootScope.loadingDataPerfil = false;
    //DADOS DO USUARIOO
    MySelf.get(
      {},
      function (data) {
        if (data.user) {
          $rootScope.current_user = data.user;
          if ($rootScope.current_user.birthday !== null) {
            var d = new Date(data.user.birthday);
            var day = (d.getDate() + 1);
            var month = (d.getMonth() + 1);
            var year = d.getFullYear();
            $rootScope.current_user.day_birthday = day;
            $rootScope.current_user.month_birthday = month;
            $rootScope.current_user.year_birthday = year;
            $rootScope.current_user.birthday = `${day}/${month}/${year}`;
          }
        }
        $rootScope.loadingDataPerfil = true;
      },
      function (data) {
        toastr.warning("Faça login novamente!");
        localStorage.removeItem('token');
        $rootScope.current_user = null;
        $rootScope.loadingDataPerfil = true;
        $state.go('home');
      }
    );
  } else {
    $rootScope.loadingDataPerfil = true;
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
