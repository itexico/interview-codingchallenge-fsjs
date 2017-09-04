(function () {
    'use strict';
    angular
            .module('app')
            .controller('deleteItemController', deleteItemController);

    deleteItemController.$inject = ['itemService', '$scope', '$uibModalInstance', 'item'];

    function deleteItemController(itemService, $scope, $uibModalInstance, item) {
        var vm = this;
        vm.item = item;
        vm.displayError = null;
        $scope.dismiss = function () {
            $uibModalInstance.close(false);
        };
        $scope.deleteItem = function () {
            itemService.delete({id: vm.item.id}, {id: vm.item.id}, function () {
                vm.displayError = false;
                setTimeout(function(){  $uibModalInstance.close(vm.item); }, 1500);
            }, function(){
                vm.displayError = true;
            });
        };

    }
})();
