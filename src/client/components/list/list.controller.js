(function () {
    'use strict';
    angular
            .module('app')
            .controller('listsController', listsController);
    listsController.$inject = ['listService', '$scope', '$filter', '$uibModal'];
    function listsController(listService, $scope, $filter, $uibModal) {
        var vm = this;
        vm.lists = {};
        vm.optionSelected = "";
        vm.listSelected = {};

        (function () {
            listService.query({}, function (response) {
                vm.lists = response;
            });
        })();

        $scope.$watch('listsVm.optionSelected', function (current) {
            if (current !== "") {
                vm.listSelected = $filter('filter')(vm.lists, {id: current})[0];
            }
        });
        
        $scope.addListForm = function (list) {
            var modalInstance = $uibModal.open({
                templateUrl: 'components/list/list.add.modal.html',
                controller: 'addListController',
                controllerAs: "addListVm",
                resolve: {
                    list: function () {
                        return list;
                    }
                }
            });
            modalInstance.result.then(function (list) {
                console.log(list);
                if (list) {
                    vm.lists.push(list);
                    vm.listSelected = list;
                    vm.optionSelected = list.id;
                }
            });

        };
        
        $scope.updateListForm = function (list) {
            var modalInstance = $uibModal.open({
                templateUrl: 'components/list/list.update.modal.html',
                controller: 'updateListController',
                controllerAs: "updateListVm",
                resolve: {
                    list: function () {
                        return list;
                    }
                }
            });
        };
        
        $scope.deleteListForm = function (list) {
            var modalInstance = $uibModal.open({
                templateUrl: 'components/list/list.delete.modal.html',
                controller: 'deleteListController',
                controllerAs: "deleteListVm",
                resolve: {
                    list: function () {
                        return list;
                    }
                }
            });
            modalInstance.result.then(function (list) {
                if (list) {
                    vm.lists.splice(vm.lists.indexOf(list), 1);
                    vm.optionSelected = "";
                    vm.listSelected = {};
                }
            });

        };
        
        // Call item forms

        $scope.addItemForm = function (list) {
            var modalInstance = $uibModal.open({
                templateUrl: 'components/item/item.add.modal.html',
                controller: 'addItemController',
                controllerAs: "addItemVm",
                resolve: {
                    list: function () {
                        return list;
                    }
                }
            });
            modalInstance.result.then(function (item) {
                if (item) {
                    vm.listSelected.items.push(item);
                }
            });

        };

        $scope.updateItemForm = function (item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'components/item/item.update.modal.html',
                controller: 'updateItemController',
                controllerAs: "updateItemVm",
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });
        };

        $scope.deleteItemForm = function (item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'components/item/item.delete.modal.html',
                controller: 'deleteItemController',
                controllerAs: "deleteItemVm",
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });
            modalInstance.result.then(function (item) {
                if (item) {
                    vm.listSelected.items.splice(vm.listSelected.items.indexOf(item), 1);
                }
            });

        };

    }
})();
