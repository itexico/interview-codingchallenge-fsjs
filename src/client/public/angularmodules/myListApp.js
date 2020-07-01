angular.module('myListApp', ['ngRoute'])
    .service('ListService', function($q, $http, configuration) {
        this.existingLists = function () {
            if (this.lists) return $q.when(this.lists);
            
            var deferred = $q.defer();

            $http({
                url: configuration.server + '/mylists',
                method: "GET",
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(function (response) {
                this.lists = response.data;
                deferred.resolve(this.lists);
            });

            return deferred.promise;
        };
    })

    .service('StorageService', function($q, $http, $location, configuration) {
        this.saveList = function (listData) {
            var isCorrect = true;
            console.log("Saving list...");
            var method = "POST";
            if(listData._id)
                method="PUT";
            
            $http({
                url: configuration.server + '/mylists',
                method: method,
                data: listData,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(function(data) {
                $location.path('/');
                isCorrect = true;
            }, function(data){
                isCorrect = false;
            });
            return isCorrect;
        };

        this.removeList = function(id){
            var isCorrect = true;
            $http({
                url: configuration.server + '/mylists',
                method: "DELETE",
                data: { "_id" : id },
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(function(data) {
                isCorrect = true;
                $location.path('/');
            }, function(data){
                isCorrect = false;
            });
            return isCorrect;
        };
    })

    .config(function($routeProvider) {
        var resolveList = {
            lists: function (ListService) {
                return ListService.existingLists();
            }
        };
        
        $routeProvider
            .when('/', {
                controller:'ShowListsController as currentLists',
                templateUrl:'views/list.html',
                resolve: resolveList
            })
            .when('/edit/:listId', {
                controller:'EditListController as editingList',
                templateUrl:'views/detail.html',
                resolve: resolveList    //TODO: here can be improved by only passing the 'id' for the list
            })
            .when('/new', {
                controller:'NewProjectController as editingList',
                templateUrl:'views/detail.html'
            })
            .otherwise({
                template:"<h1>Nothing to show here!</h1>"
        });
    })

    .controller('ShowListsController', function(lists) {
        console.log('show current lists');
        this.lists = lists;
    })
    
    .controller('NewProjectController', function($scope, $rootScope, StorageService, NotificationService) {
        var editingList = this;
        $scope.action = 'New list';
        var newList={
            "description" : "",
            "name" : "",
            "items" : [ ]
        };

        editingList.list=newList;

        editingList.save = function() {
            console.log(this.list);
            var result = StorageService.saveList(this.list);
            $rootScope.notificationList = [NotificationService.createNotificationObject(result)];
        };

        editingList.addItem = function(){
            if(editingList.list.items.length <= 10)
                editingList.list.items.push({"name":""});
        }

        editingList.removeItem = function(index){
            editingList.list.items.splice(index, 1);
        };
    })

    .controller('EditListController', function($routeParams, $scope, $rootScope, lists, StorageService, NotificationService) {
        $scope.action = 'Edit list';
        var editingList = this;
        var listId = $routeParams.listId;

        var list = lists.find(function(el){ return el._id === listId});
        editingList.list = list;
    
        editingList.destroy = function() {
            var result = StorageService.removeList(this.list._id);
            $rootScope.notificationList = [NotificationService.createNotificationObject(result)];
        };
    
        editingList.save = function() {
            debugger;
            var result = StorageService.saveList(this.list);
            $rootScope.notificationList = [NotificationService.createNotificationObject(result)];
        };

        editingList.addItem = function(){
            if(editingList.list.items.length<=10)
                editingList.list.items.push({"name":""});
        }

        editingList.removeItem = function(index){
            editingList.list.items.splice(index, 1);
        };
    });

