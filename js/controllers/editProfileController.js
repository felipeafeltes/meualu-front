(function () {
    'use strict';
    app.controller('editProfileController', editProfileController);

    function editProfileController($rootScope, UpdateUsersService, $scope, $state, $http, viaCep) {
        $scope.response = true;
        $scope.user = $rootScope.current_user;
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
            if (cepValue !== undefined) {
                if (cepValue.length === 8) {
                    toastr.info("Procurando CEP...")
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', 'https://viacep.com.br/ws/' + cepValue + '/json/');
                    xhr.addEventListener('load', function () {
                        var ceps = xhr.responseText;
                        var cep = JSON.parse(ceps);
                        $scope.user.address.city = cep.localidade;
                        $scope.user.address.complement = cep.complemento;
                        $scope.user.address.country = 'Brasil';
                        $scope.user.address.district = cep.bairro;
                        $scope.user.address.number = cep.gia;
                        $scope.user.address.state = cep.uf;
                        $scope.user.address.street = cep.logradouro;
                    });
                    xhr.send();
                }
            }
        }
    }
})()
