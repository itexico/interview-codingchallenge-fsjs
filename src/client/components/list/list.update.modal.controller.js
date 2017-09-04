(function () {
    'use strict';
    angular
            .module('app')
            .controller('updateListController', updateListController);

    updateListController.$inject = ['listService', '$scope', '$uibModalInstance', 'list'];

    function updateListController(listService, $scope, $uibModalInstance, list) {
        var vm = this;
        vm.list = list;
        vm.displayError = null;
        $scope.dismiss = function () {
            $uibModalInstance.close(false);
        };
        $scope.updateList = function () {
            listService.update({id: vm.list.id},{id: vm.list.id, description: vm.list.description}, function () {
                vm.displayError = false;
                setTimeout(function(){ $uibModalInstance.close(); }, 1500);
            }, function(){
                vm.displayError = true;
            });
        };

    }
})();
