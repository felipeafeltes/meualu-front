(function () {
    'use strict';
    app.controller('editProfileController', editProfileController);

    function editProfileController($rootScope, UsersService, $scope, $state, Viacep) {
        $scope.response = true;
        $scope.user = $rootScope.user;
        $scope.edit = function (isValid) {
            if (isValid) {
                $scope.response = false;
                UsersService.update($scope.user).$promise.then(
                    function (data) {
                        $scope.response = true;
                        console.log(data)
                    },
                    function (err) {
                        console.log(err)
                    }
                );
            }
        };

        $scope.searchCep = function (cepValue) {
            if (cepValue.length === 8) {
                toastr.info("Procurando CEP...")
                Viacep.get({ 'cep': cepValue }).$promise.then(
                    function (data) {
                        $scope.user.city = data.localidade;
                        $scope.user.complement = data.complemento;
                        $scope.user.country = 'Brasil';
                        $scope.user.district = data.bairro;
                        $scope.user.number = data.gia;
                        $scope.user.state = data.uf;
                        $scope.user.street = data.logradouro;
                    }
                )
            }
        }
    }
})()
