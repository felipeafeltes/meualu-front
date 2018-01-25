(function () {
    'use strict';
    app.controller('myInfosProfileController', myInfosProfileController);
    function myInfosProfileController(
        $rootScope,
        myPropertie,
        PropertyService,
        PropertyRentalService,
        $scope,
        PropertyPrivate,
        editPropertyPrivate,
        $window,
        $anchorScroll) {
        $scope.hasProperties = false;
        $scope.editRequest = true;
        $scope.deleteRequest = true;
        $scope.properties = [];
        $scope.propertie = new myPropertie();
        $scope.idToDelete;
        $scope.idToEdit;
        $scope.positionToDelete;
        $scope.positionToEdit;
        $scope.dataEdited;
        //Aluguel
        newRental();

        $scope.iptuSelect = function () {
            if ($scope.rental.iptu_included === true) {
                $scope.rental.iptu = '0,00';
            }
        };

        $scope.checkValue = function (isValid) {
            $scope.checked = true;
            if (isValid) {
                $scope.rental.value = $scope.rental.value.replace('.', '').replace(',', '.');
                $scope.rental.condominium = $scope.rental.condominium.replace('.', '').replace(',', '.');
                ($scope.rental.iptu === undefined) ? $scope.rental.iptu = '0,00' : $scope.rental.iptu.replace('.', '').replace(',', '.');
                PropertyRentalService.query(
                    { rental: $scope.rental },
                    function (response) {
                        $scope.first_alu_fee = response.rental.first_alu_fee
                        $scope.first_net_value = response.rental.first_net_value
                        $scope.others_alu_fee = response.rental.others_alu_fee
                        $scope.others_net_value = response.rental.others_net_value
                        $scope.package_value = response.rental.package_value
                        $scope.rentalResponse = response.rental;
                    })
            }
        }

        //IMOVEIS DO USUARIO        
        $scope.propertie.$get(
            function (data) {
                $scope.hasProperties = true;
                $scope.properties = data.properties;
                if ($scope.properties.length === 0) {
                    $scope.noPropertie = "Nenhum apartamento cadastrado =(";
                }
            },
        );

        $scope.getPropertyId = function (id, i) {
            $scope.idToDelete = id;
            $scope.positionToDelete = i;
            $('#modalDeleteProperty').modal('show');
        }

        $scope.getProperty = function (data, i) {
            newRental()
            $scope.idToEdit = data.id;
            $scope.first_alu_fee = data.rental.first_alu_fee
            $scope.first_net_value = data.rental.first_net_value
            $scope.others_alu_fee = data.rental.others_alu_fee
            $scope.others_net_value = data.rental.others_net_value
            $scope.package_value = data.rental.package_value
            $scope.rentalResponse = data.rental;
            $scope.positionToEdit = i;
            $('#modalRentalProperty').modal('show');
        }

        $scope.editProperty = function (isValid,i,id) {
            if (isValid) {
                $scope.editRequest = false;
                editPropertyPrivate.update({ id: id, rental:$scope.rental}).$promise.then(
                    function (response) {
                        $scope.editRequest = true;
                        toastr.success("Valores atualizados!");
                        $('#modalRentalProperty').modal('hide');
                        $scope.properties[i].rental = $scope.rentalResponse;
                    }
                );
            }
        }

        $scope.deleteProperty = function (id, i) {
            $scope.deleteRequest = false;
            PropertyPrivate.delete({ id: id }).$promise.then(
                function (data) {
                    $scope.deleteRequest = true;
                    $scope.properties.splice(i, 1);
                    toastr.success("Imóvel removido!");
                    $('#modalDeleteProperty').modal('hide');
                }
            );
        }

        function newRental(){
            $scope.rental = {};
            $scope.rentalResponse;
            $scope.rental.iptu_type = 'Mensal';
            $scope.rental.iptu = '0,00'
            $scope.checked = false;
        }


    }
})();
