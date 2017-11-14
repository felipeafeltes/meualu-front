(function () {
    'use strict';
    app.controller('profileController', profileController);

    function profileController($rootScope, UsersService, myPropertiesService, $scope, $state, $window) {
        $scope.hasProperties = false;
        $scope.hasData = false;
        $scope.properties = [];
        $scope.profile = new UsersService();
        $scope.properties = new myPropertiesService();

        //DADOS DO USUARIO
        $scope.profile.$get(
            { id: $rootScope.current_user.id },
            function (data) {
                $scope.hasData = true;
                $scope.user = data;
                console.log(data)
            },
        );
        
        //IMOVEIS DO USUARIO
        $scope.properties.$get({ token: $window.localStorage.getItem('token') },
            function (data) {
                $scope.hasProperties = true;
                $scope.properties = data;
                console.log(data)
            },
        );
    }
})()
