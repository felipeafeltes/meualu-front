app.directive('validay', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModel) {
            $scope.$watch($attrs.ngModel, function (value) {
                var isValid;
                if (value > 0 && value < 32) {
                    isValid = true;
                    ngModel.$setValidity('day', isValid);
                } else {
                    isValid = false;
                    ngModel.$setValidity('day', isValid);
                }
            });
        }
    };
});

app.directive('validmonth', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModel) {
            $scope.$watch($attrs.ngModel, function (value) {
                var isValid;
                if (value > 0 && value <= 12) {
                    isValid = true;
                    ngModel.$setValidity('month', isValid);
                } else {
                    isValid = false;
                    ngModel.$setValidity('month', isValid);
                }
            });
        }
    };
});

app.directive('validyear', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModel) {
            $scope.$watch($attrs.ngModel, function (value) {
                var isValid;
                if (value >= 1900) {
                    isValid = true;
                    ngModel.$setValidity('year', isValid);
                } else {
                    isValid = false;
                    ngModel.$setValidity('year', isValid);
                }
            });
        }
    };
});

app.directive('actuallydate', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModel, $filter) {
            $scope.$watch($attrs.ngModel, function (value) {
                var isValid;
                var d = new Date(value).toLocaleDateString();
                var valDate = new Date().toLocaleDateString();

                if (d >= valDate) {
                    isValid = true;
                    ngModel.$setValidity('actuallydate', isValid);
                } else if (d < valDate) {
                    isValid = false;
                    ngModel.$setValidity('actuallydate', isValid);
                }

            });
        }
    };
});
