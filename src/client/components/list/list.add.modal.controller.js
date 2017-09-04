(function () {
    'use strict';
    angular
            .module('app')
            .controller('addListController', addListController);

    addListController.$inject = ['listService', '$scope', '$uibModalInstance'];

    function addListController(listService, $scope, $uibModalInstance) {
        var vm = this;
        vm.list = {};
        vm.displayError = null;
        $scope.dismiss = function () {
            $uibModalInstance.close(false);
        };
        $scope.addList = function () {
            listService.create({description: vm.list.description}, function (response) {
                vm.displayError = false;
                console.log(response);
                setTimeout(function(){  $uibModalInstance.close(response); }, 1500);
            }, function(){
                vm.displayError = true;
            });
        };

    }
})();
