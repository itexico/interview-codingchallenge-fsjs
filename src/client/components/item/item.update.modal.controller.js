(function () {
    'use strict';
    angular
            .module('app')
            .controller('updateItemController', updateItemController);

    updateItemController.$inject = ['itemService', '$scope', '$uibModalInstance', 'item'];

    function updateItemController(itemService, $scope, $uibModalInstance, item) {
        var vm = this;
        vm.item = item;
        vm.displayError = null;
        $scope.dismiss = function () {
            $uibModalInstance.close(false);
        };
        $scope.updateItem = function () {
            itemService.update({id: vm.item.id},{id: vm.item.id, description: vm.item.description}, function () {
                vm.displayError = false;
                setTimeout(function(){ $uibModalInstance.close(); }, 1500);
            }, function(){
                vm.displayError = true;
            });
        };

    }
})();
