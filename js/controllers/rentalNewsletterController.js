(function(){
    'use strict';
  app.controller('rentalNewsletterController', rentalNewsletterController);

  function rentalNewsletterController($scope, rentalNewsletter, $uibModalInstance) {
    $scope.contact = new rentalNewsletter();
    $scope.contact.state = "RS";
    $scope.contact.city = "Porto Alegre";

    $scope.create = function (isValid) {
      if (isValid){
        $scope.contact.$save(
          // success
          function (data) {
            console.log(data);
            $uibModalInstance.close();
          }
        );
      }
    };
  }
})()
