(function () {
    'use strict';
    app.controller('editProfileController', editProfileController);

    function editProfileController($rootScope, UpdateUsersService, $scope, $state, Viacep) {
        $scope.response = true;
        $scope.user = $rootScope.user;
        $scope.sexOptions = [{
            value: 'male',
            label: 'Masculino',
        }, {
            value: 'female',
            label: 'Feminino',
        }];

        $scope.edit = function (isValid) {
            if (isValid) {
                $scope.response = false;
                UpdateUsersService.update($scope.user).$promise.then(
                    function (data) {
                        $scope.response = true;
                        toastr.success("Cadastro atualizado!");
                    },
                    function (err) {
                        toastr.error(err.errors)
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
