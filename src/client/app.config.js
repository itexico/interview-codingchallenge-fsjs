(function () {
    angular.module('app').config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $urlRouterProvider.otherwise("/");
        $stateProvider
                .state('dashboard', {
                    url: "/",
                    templateUrl: "components/layout/dashboard.html",
                    controller: "dashboardController"
                });
    }).run();
})();

