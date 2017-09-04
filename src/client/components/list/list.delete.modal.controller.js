(function () {
    'use strict';
    angular
            .module('app')
            .controller('deleteListController', deleteListController);

    deleteListController.$inject = ['listService', '$scope', '$uibModalInstance', 'list'];

    function deleteListController(listService, $scope, $uibModalInstance, list) {
        var vm = this;
        vm.list = list;
        vm.displayError = null;
        $scope.dismiss = function () {
            $uibModalInstance.close(false);
        };
        $scope.deleteList = function () {
            listService.delete({id: vm.list.id}, {id: vm.list.id}, function () {
                vm.displayError = false;
                setTimeout(function(){  $uibModalInstance.close(vm.list); }, 1500);
            }, function(){
                vm.displayError = true;
            });
        };

    }
})();
