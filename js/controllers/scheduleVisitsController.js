(function(){
    'use strict';
  app.controller('ScheduleVisitsModalController', ScheduleVisitsModalController);
  app.controller('ScheduleVisitsCreateController', ScheduleVisitsCreateController);

  function ScheduleVisitsModalController($scope, $uibModal) {
    $scope.showModal = function(propertyId) {
        $scope.propertyId = propertyId;
        $uibModal.open({
            templateUrl: 'scheduleVisitModal.htm',
            size: 'lg',
            controller: 'ScheduleVisitsCreateController',
            resolve: {
                propertyId: function() {
                    return $scope.propertyId;
                }
            }
        });
    }
  }

  function ScheduleVisitsCreateController($scope, propertyId, ScheduleVisit, $uibModalInstance) {
      $scope.scheduleVisit = new ScheduleVisit();
      $scope.scheduleVisit.property_id = propertyId;

      $scope.add = function () {
          $scope.scheduleVisit.$save(
              // success
              function (data) {
                  console.log(data);
                  $uibModalInstance.close();
              },
              // error
              function (error) {
                  _showValidationErrors($scope, error);
              }
          );
      };

      $scope.close = function() {
        $uibModalInstance.close();
      };
  }

  function _showValidationErrors($scope, error) {
      $scope.validationErrors = [];
      if (error.status === 401 && error.data && angular.isObject(error.data)) {
          var errors = [];
          errors = error.data['errors'];
          for (i = 0; i < errors.length; i++) {
              $scope.validationErrors.push(errors[i]);
          }
      } else {
          $scope.validationErrors.push('Não foi possível completar o login do usuário');
      };
  }
})()