app.directive('negative', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModel) {
            $scope.$watch($attrs.ngModel, function (value) {
                var er = /[^0-9.]/;
                er.lastIndex = 0;
                var campo = num;
                if (er.test(campo.value)) {
                    campo.value = "";
                }

            });
        }
    };
});

app.directive('minum', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModel) {
            $scope.$watch($attrs.ngModel, function (value) {
                if (parseInt(value) < 1) {
                    ngModel.$setValidity('minum', false);
                } else {
                    ngModel.$setValidity('minum', true);
                }
            });
        }
    };
});

