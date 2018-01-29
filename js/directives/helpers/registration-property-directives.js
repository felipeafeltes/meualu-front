app.directive("bedroomsvalue", function () {
    return {
        require: "ngModel",
        scope: {
            bedroomsvalue: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.$watch(function () {
                var combined;
                if (scope.bedroomsvalue || ctrl.$viewValue) {
                    combined = scope.bedroomsvalue + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function (value) {
                if (value) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        var origin = scope.bedroomsvalue;
                        if (origin < viewValue) {
                            ctrl.$setValidity("bigger", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("bigger", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});