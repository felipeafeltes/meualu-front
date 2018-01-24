app.directive('negative', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModel) {
            $scope.$watch($attrs.ngModel, function (value) {
                var isValid;
                if (value >= 0) {
                    isValid = true;
                    ngModel.$setValidity('negative', isValid);
                } else if(value < 0){
                    isValid = false;
                    ngModel.$setValidity('negative', isValid);
                }
            });
        }
    };
});
