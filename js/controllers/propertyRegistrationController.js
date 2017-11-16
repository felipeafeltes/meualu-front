(function () {
    'use strict';

    app.controller('propertyRegistrationController', propertyRegistrationController);

    function propertyRegistrationController($rootScope, $scope, $state, myPropertiesService) {
        $scope.cropper = {};
        $scope.cropper.sourceImage = null;
        $scope.cropper.croppedImage = null;
        $scope.bounds = {};
        $scope.bounds.left = 0;
        $scope.bounds.right = 0;
        $scope.bounds.top = 0;
        $scope.bounds.bottom = 0;

        $scope.propertie = new myPropertiesService();
        $scope.extraInfos = [];

        $scope.processForm = function () {
            console.log($scope.propertie);
            console.log($scope.extraInfos);
        }

        $scope.searchAdress = function () {
            var address = $scope.address;
            if (address) {
                if (address.formatted_address != undefined && $rootScope.address_string != address.formatted_address) {
                    $rootScope.address_string = address.formatted_address;
                }
                if (address.geometry != undefined) {
                    $rootScope.lng = address.geometry.location.lng();
                    $rootScope.lat = address.geometry.location.lat();
                }
            } else {
                $rootScope.lat = "-30.0490415";
                $rootScope.lng = "-51.1916632";
            }
            if (address.address_components !== undefined) {
                if (address.address_components[5] !== undefined) {
                    $scope.propertie.street = address.address_components[0].long_name;
                    $scope.propertie.cep = address.address_components[5].long_name;
                    $scope.propertie.city = address.address_components[2].long_name;
                    $scope.propertie.state = address.address_components[3].long_name;
                } else {
                    $scope.propertie.street = address.address_components[0].long_name;
                    $scope.propertie.cep = address.address_components[4].long_name;
                    $scope.propertie.city = address.address_components[1].long_name;
                    $scope.propertie.state = address.address_components[2].long_name;
                }
            }
        }

        var PoABounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-30.255998, -51.224980),
            new google.maps.LatLng(-29.963159, -51.096578));

        $scope.autocompleteOptions = {
            componentRestrictions: { country: 'br' },
            bounds: PoABounds,
            types: ['address']
        }

    }

})();