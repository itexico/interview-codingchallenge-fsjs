(function () {
    'use strict';
    angular
            .module('app')
            .controller('addItemController', addItemController);

    addItemController.$inject = ['itemService', '$scope', '$uibModalInstance', 'list'];

    function addItemController(itemService, $scope, $uibModalInstance, list) {
        var vm = this;
        vm.item = {};
        vm.list = list;
        vm.displayError = null;
        $scope.dismiss = function () {
            $uibModalInstance.close(false);
        };
        $scope.addItem = function () {
            itemService.create({description: vm.item.description, list_id: vm.list.id}, function (response) {
                vm.displayError = false;
                setTimeout(function(){  $uibModalInstance.close(response); }, 1500);
            }, function(){
                vm.displayError = true;
            });
        };

    }
})();
