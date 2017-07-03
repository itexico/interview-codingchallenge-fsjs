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
            });
        };

        this.removeList=function(id){
            $http({
                url: configuration.server + '/mylists',
                method: "DELETE",
                data: { "_id" : id },
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(function(data) {
                $location.path('/');
            });
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
                templateUrl:'list.html',
                resolve: resolveList
            })
            .when('/edit/:listId', {
                controller:'EditListController as editingList',
                templateUrl:'detail.html',
                resolve: resolveList    //TODO: here can be improved by only passing the 'id' for the list
            })
            .when('/new', {
                controller:'NewProjectController as editingList',
                templateUrl:'detail.html'
            })
            .otherwise({
                template:"<h1>Nothing to show here!</h1>"
        });
    })

    .controller('ShowListsController', function(lists) {
        console.log('show current lists');
        this.lists = lists;
    })
    
    .controller('NewProjectController', function($location, $http, $scope, StorageService) {
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
            StorageService.saveList(this.list);
        };

        editingList.addItem = function(){
            if(editingList.list.items.length<=10)
                editingList.list.items.push({"name":""});
        }

        editingList.removeItem = function(index){
            editingList.list.items.splice(index, 1);
        };
    })

    .controller('EditListController', function($location, $routeParams, $http, $scope, lists, StorageService) {
        $scope.action = 'Edit list';
        var editingList = this;
        var listId = $routeParams.listId;

        var list = lists.find(function(el){ return el._id === listId});
        editingList.list = list;
    
        editingList.destroy = function() {
            StorageService.removeList(this.list._id);
        };
    
        editingList.save = function() {
            StorageService.saveList(this.list);
        };

        editingList.addItem = function(){
            if(editingList.list.items.length<=10)
                editingList.list.items.push({"name":""});
        }

        editingList.removeItem = function(index){
            editingList.list.items.splice(index, 1);
        };
    });

