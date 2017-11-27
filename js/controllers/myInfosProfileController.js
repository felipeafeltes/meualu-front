(function () {
    'use strict';
    app.controller('myInfosProfileController', myInfosProfileController);

    function myInfosProfileController($rootScope, myPropertie, PropertyService, $scope, $state, $window, $anchorScroll) {
        $scope.hasProperties = true;
        $scope.properties;
        $scope.propertie = new myPropertie();

        /*         $("#propertiesDiv").scroll(function () {
                    if ($(this).scrollTop() + $(this).height() == $(this).get(0).scrollHeight) {
                        alert('fim');
                    }
                });
         */

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

        $scope.deleteProperty = function (id) {
            PropertyService.delete({ id: id }).$promise.then(
                function (data) {
                    toastr.success("Imóvel removido!");
                }
            );
        }

    }
})()
