(function () {
    'use strict';
    angular
            .module('app')
            .controller('dashboardController', dashboardController);
    dashboardController.$inject = ['userService'];
    function dashboardController(userService) {
        var vm = this;
        vm.user = {};
        vm.setCookie = setCookie;
        vm.setCookie();
        (function () {
            userService.query({}, function (response) {
                vm.user = response;
            });
        })();

        function setCookie() {
            var days = 12;
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "expires=" + date.toGMTString();
            document.cookie = "auth=auth; " + expires + "; path=/";
            console.log(document.cookie);
        }
    }
})();
