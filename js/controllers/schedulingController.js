(function () {
    'use strict';
    app.controller('schedulingController', schedulingController);

    function schedulingController($scope, $rootScope, $ocLazyLoad) {
        var selector = '#days button';
        $(selector).on('click', function () {
            $(selector).removeClass('active');
            $(this).addClass('active');
        });

    }
})()