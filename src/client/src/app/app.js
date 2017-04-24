/**
 * @ngdoc controller
 * @name AppCtrl
 * @scope true
 *
 * @description
 * This is the main controller for the app
 *
 * @param {service} $scope - controller scope
 */
angular.module('ToDoChallenge', [
    'ui.router',
    'ngCookies',
    'ToDoChallenge.login',
    'ToDoChallenge.overview'
])

.config( function ToDoChallengeConfig ( $locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise( '/' )
})

.controller('AppCtrl', function AppCtrl($scope, $timeout, $window, $state, $request) {
    /**
     * The title of the current page
     * @memberOf AppCtrl
     * @type {string}
     */
    $scope.pageTitle = '';

    /**
     * The name of the state of current page to check the menu
     * @memberOf AppCtrl
     * @type {string}
     */
    $scope.stateName = '';

    /**
     * Event triggered when angular url change successfully and set the title of the page
     * and the name of the state to set the active class on the index menu
     *
     * @name $stateChangeSuccess
     * @event $stateChangeSuccess
     * @memberOf AppCtrl
     *
     * @param {object} event - event object
     * @param {object} toState - toState data
     * @param {object} toParams
     * @param {object} fromState
     * @param {object} fromParams
     */
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $scope.stateName = toState.name;

        if ( angular.isDefined( toState.data.pageTitle ) ) {
            $scope.pageTitle = toState.data.pageTitle;
        }

        $timeout(function () {
            //This is a global funcion to set the content size to the screen size
            $window.defineContentSize();
        }, 0);
    });
});