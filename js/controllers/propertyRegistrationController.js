(function () {
    'use strict';
    app.controller('propertyRegistrationController', propertyRegistrationController);

    function propertyRegistrationController($rootScope, $scope, $state) {

        $scope.profile_name = "Luciana Martins";
        $scope.profile_img_url = "http://www.homenscomestilo.com/wp-content/uploads/2013/10/COMO-ESCOLHER-FOTO-DE-PERFIL-HOMEM-6.jpg";
    }

})();