(function () {
    'use strict';
    app.controller('profileController', profileController);

    function profileController($rootScope, UsersService, myPropertiesService, $scope, $state, $window) {
        $scope.hasProperties = true;
        $scope.hasData = false;
        $scope.properties;
        $scope.profile = new UsersService();
        $scope.properties = new myPropertiesService();

        $('body').css('overflow','hidden');

        $scope.teste = [
            {
                img_url: 'http://s2.glbimg.com/_orpFotNbxHB7Hm6-9rOqN2s-Mw=/smart/e.glbimg.com/og/ed/f/original/2016/04/01/apartamento-mauriciokaram_07.jpg',
                full_address: 'Demonstração',
                address: 'Av teste',
                bedrooms: '3',
                garages: '4',
                total_area: '100',
                rental: 420,
                total_rental: 4200
            },
            {
                img_url: 'http://s2.glbimg.com/feWuUX0z-7pLnz4wnUSaw_fpglA=/smart/e.glbimg.com/og/ed/f/original/2016/02/01/apartamento-samy-e-ricky-lapa360-01.jpg',
                full_address: 'Demonstração',
                address: 'Av teste',
                bedrooms: '3',
                garages: '4',
                total_area: '100',
                rental: 420,
                total_rental: 4200
            }
        ]

        //DADOS DO USUARIO
        $scope.profile.$get(
            { id: $rootScope.current_user.id },
            function (data) {
                $('body').css('overflow','auto');
                $scope.hasData = true;
                $rootScope.user = data
                console.log($scope.user)
            },
        );

        //IMOVEIS DO USUARIO
        $scope.properties.$get(
            function (data) {
                $scope.hasProperties = true;
                console.log(data)
                $scope.properties = data;
            },
        );
    }
})()
