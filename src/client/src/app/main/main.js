/**
 * @ngdoc controller
 * @name LoginCtrl
 *
 * @description
 * Controller for login page
 *
 * @constructor
 * @param {service} $scope
 * @param {service} LoginCtrl - To make request to the server
 */
angular.module('ToDoChallenge.login', [
    'ToDoChallenge.services.login'
])
.config(function configLogin($stateProvider) {
    $stateProvider.state('login', {
        url: '/',
        views: {
            'layout': {
                controller: 'LoginCtrl',
                templateUrl: 'app/main/main.tpl.html'
            }
        },
        data: {
            pageTitle: 'Log In'
        }
    });
})
.controller('LoginCtrl', function LoginCtrl($rootScope, $scope, $state, $cookies, MainService) {
    $scope.loading = false;
    $scope.user = {};

    /**
     * @function
     * @name logIn
     * @memberOf LoginCtrl
     * @description
     * Send username and password to the service
     */
    $scope.logIn = function() {
        $scope.loading = true;

        MainService.logIn($scope.user).then(function(response) {
            $rootScope.$broadcast('userAuthenticated');
            $state.go('overview.content');
            $cookies.put('user', response.cookie);
        }, function(err) {
            $scope.loading = false;
            alert("Your username/password is incorrect.");
        });
    };
});