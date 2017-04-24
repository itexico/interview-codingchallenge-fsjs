angular.module('ToDoChallenge.overview', [
    'ToDoChallenge.services.$request'
])
.config(function configOverview($stateProvider) {
    $stateProvider.state('overview', {
        views: {
            layout: {
                templateUrl: 'app/layout/layout.tpl.html'
            }
        }
    }).state('overview.content', {
        url: '/overview',
        data: {
            pageTitle: 'Overview'
        },
        views: {
            main: {
                controller: 'OverviewCtrl',
                templateUrl: 'app/overview/overview.tpl.html'
            }
        }
    });
})
.controller('OverviewCtrl', function OverviewCtrl($rootScope, $scope, $state, $cookies) {
    /**
     * @function
     * @name getListData
     * @memberOf OverviewCtrl
     * @description
     * Get the lists from the user
     */
    $scope.getListData = function() {
        $scope.loading = true;
        console.log($cookies.get('user'));

        // OverviewService.getListData({ store: store.$$state.value.storeName, start: start, end: end })
        // .then(function(response) {
        //     $scope.tripsBox = {
        //         title: 'TRIPS',
        //         icon: 'assets/img/logo.png',
        //         value: response.totalDealClicks
        //     };

        //     $scope.searchesBox = {
        //         title: 'SEARCHES',
        //         icon: 'assets/img/logo.png',
        //         value: response.totalSearches
        //     };

        //     $scope.dealsClicksBox = {
        //         title: 'DEAL CLICKS',
        //         icon: 'assets/img/logo.png',
        //         value: response.totalTrips
        //     };

        //     $scope.searches = {
        //         name: 'TOP SEARCHES',
        //         params: response.searches
        //     };

        //     $scope.dealClicks = {
        //         name: 'TOP DEALS CLICKED',
        //         params: response.dealClicks
        //     };
        //     // HARCODED
        //     $scope.oosTop = {
        //         name: 'TOP OOS DEPARTMENTS',
        //         params: [
        //             {
        //                 name: 'Building Materials',
        //                 total: 8
        //             },
        //             {
        //                 name: 'Tools',
        //                 total: 8
        //             },
        //             {
        //                 name: 'Lighting & Ceiling Fans',
        //                 total: 6
        //             },
        //             {
        //                 name: 'Electrical',
        //                 total: 5
        //             },
        //             {
        //                 name: 'Plumbing',
        //                 total: 3
        //             },
        //             {
        //                 name: 'Storage & Organization',
        //                 total: 1
        //             }
        //         ]
        //     };

        //     return $api.getOosDataByStoreName(store.$$state.value.storeName, start, end);
        // })
        // .then(function (oos) {
        //     $scope.oosBox = {
        //         title: 'VOIDS',
        //         icon: 'assets/img/logo.png',
        //         value: oos.length
        //     };
        // }).catch(function (err) {
        //     console.log(err);
        //     alert('Error getting store data');
        // });
    };

    $scope.getListData();
});