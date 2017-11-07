(function () {
    'use strict';
    app.controller('editProfileController', editProfileController);

    function editProfileController($rootScope, $scope, $state) {

        $scope.profile_name = "Luciana Martins";
        $scope.profile_img_url = "http://www.homenscomestilo.com/wp-content/uploads/2013/10/COMO-ESCOLHER-FOTO-DE-PERFIL-HOMEM-6.jpg";
        $scope.response = true;

        var formContacts = {
            first_name: '',
            last_namme: '',
            gender: '',
            birthday: '',
            email: '',
            phone: '',
            phone2: '',
            cep: '',
            city: '',
            address: '',
            number: 1,
            complement: '',
            description: ''
        }

        $scope.edit = function (isValid) {
            if (isValid) {
                $scope.response = false
                formContacts = $scope.contact;
                console.log(formContacts);
            }
        };
    }
})()
