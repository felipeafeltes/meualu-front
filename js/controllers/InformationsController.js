(function(){
    'use strict';
  app.controller('InformationsController', InformationsController);

  function InformationsController($scope, $rootScope) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 11 };

    $scope.scrollToFixedOptions = {
      preFixed: function() { $(this).css('margin-top', '5px'); },
      postFixed: function() { $(this).css('margin-top', '-40px');}
    };

    $scope.images = [
      {src: "assets/imagens/imovel.jpg"},
      {src: "assets/imagens/imovel.jpg"},
      {src: "assets/imagens/imovel.jpg"},
      {src: "assets/imagens/imovel.jpg"},
      {src: "assets/imagens/imovel.jpg"},
      {src: "assets/imagens/imovel.jpg"}
    ];

    $scope.properties_related = [
      {
        address:{
          street: "Rua machado de Assis",
          neighborhood: "Jardim Botanico"
        }
      },
      {
        address:{
          street: "Rua machado de Assis",
          neighborhood: "Jardim Botanico"
        }
      },
      {
        address:{
          street: "Rua machado de Assis",
          neighborhood: "Jardim Botanico"
        }
      },
      {
        address:{
          street: "Rua machado de Assis",
          neighborhood: "Jardim Botanico"
        }
      },
      {
        address:{
          street: "Rua machado de Assis",
          neighborhood: "Jardim Botanico"
        }
      },
      {
        address:{
          street: "Rua machado de Assis",
          neighborhood: "Jardim Botanico"
        }
      }
    ];
  }

})()
