app.directive("passwordConfirm", function () {
    return {
        require: "ngModel",
        scope: {
            passwordConfirm: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.$watch(function () {
                var combined;
                if (scope.passwordConfirm || ctrl.$viewValue) {
                    combined = scope.passwordConfirm + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function (value) {
                if (value) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        var origin = scope.passwordConfirm;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordConfirm", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordConfirm", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});