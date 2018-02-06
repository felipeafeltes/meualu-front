app.directive("bedroomsvalue", function () {
    return {
        require: "ngModel",
        scope: {
            bedroomsvalue: '='
        },
        link: function (scope, element, attrs, ctrl) {
            scope.$watch(function () {
                if (scope.bedroomsvalue && ctrl.$viewValue) {
                    if (scope.bedroomsvalue < parseInt(ctrl.$viewValue)) {
                        ctrl.$setValidity("bigger", false);
                        return false;
                    } else {
                        ctrl.$setValidity("bigger", true);
                        return true;
                    }
                }
            })
        }
    };
});