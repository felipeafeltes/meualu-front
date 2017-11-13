(function () {
    'use strict';
    app.controller('profileController', profileController);

    function profileController($rootScope, UsersService, $scope, $state) {
        $scope.response = false;
        $scope.profile = new UsersService();
        $scope.profile.$get(
            { id: $rootScope.current_user.id },
            function (data) {
                $scope.response = true;
                $scope.user = data;
                console.log(data)
            },
        );

        $scope.profile_rating = 4;
        $scope.profile_img_url = "http://www.homenscomestilo.com/wp-content/uploads/2013/10/COMO-ESCOLHER-FOTO-DE-PERFIL-HOMEM-6.jpg";

        $scope.properties = [
            {
                address: 'Jardim Botânico',
                full_address: 'Rua Machado de Assis',
                img_url: 'http://conteudo.imguol.com.br/2012/04/10/reforma-do-apartamento-de-60m-putti---arquiteto-flavio-castro-1334076712735_750x400.jpg',
                bedrooms: 3,
                garages: 1,
                total_area: 55,
                rental: 98,
                total_rental: 980
            },
            {
                address: 'Jardim Botânico',
                full_address: 'Rua Machado de Assis',
                img_url: 'http://www.transformesuacasa.com.br/wp-content/uploads/2015/11/decora%C3%A7%C3%A3o-de-interiores-para-apartamentos-pequenos.jpg',
                bedrooms: 3,
                garages: 1,
                total_area: 55,
                rental: 98,
                total_rental: 980
            },
            {
                address: 'Jardim Botânico',
                full_address: 'Rua Machado de Assis',
                img_url: 'http://www.decoracaoeprojetos.com.br/wp-content/uploads/2011/11/Fotos-de-decora%C3%A7%C3%A3o-de-interiores-de-apartamentos-619x390.jpg',
                bedrooms: 3,
                garages: 1,
                total_area: 55,
                rental: 98,
                total_rental: 980
            }
        ]

    }
})()
