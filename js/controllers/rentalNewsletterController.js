(function () {
  'use strict';
  app.controller('rentalNewsletterController', rentalNewsletterController);

  function rentalNewsletterController($scope, rentalNewsletter, $uibModalInstance) {

    $scope.contact = new rentalNewsletter();
    $scope.contact.state = "RS";
    $scope.contact.city = "Porto Alegre";
    $scope.submittedForm = false;
    $scope.response = true;

    $scope.create = function (isValid) {
      if (isValid) {
        $scope.response = false;
        $scope.contact.$save(
          // success
          function (data) {
            $scope.submittedForm = true;
            $scope.response = true;
          }
        );
      }
    };

    $scope.closeModal = function () {
      $uibModalInstance.close();
    }
  }
})();
