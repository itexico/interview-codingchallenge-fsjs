var app = angular.module('myStuffApp', []);

app.factory('Stuffs', ['$http', function($http) {
    var stuffsFactory = {};

    stuffsFactory.getStuffs = function() {
        return $http.get('/stuffs');
    }

    stuffsFactory.createStuff = function(body) {
        return $http.post('/stuffs', body);
    }

    stuffsFactory.readStuff = function(stuffId) {
        return $http.get('/stuffs/' + stuffId);
    }

    stuffsFactory.updateStuff = function(stuffId, body) {
        return $http.put('/stuffs/' + stuffId, body);
    }

    stuffsFactory.deleteStuff = function(stuffId) {
        return $http.delete('/stuffs/' + stuffId);
    }

    return stuffsFactory;
}]);

app.controller('StuffController', ['$scope', '$filter', 'Stuffs', function($scope, $filter, Stuffs) {
    $scope.currentStuffId = null;

    var showSpinner = function(displaySpinner) {
        if (displaySpinner) {
            $('#spinner').show();
        } else {
            $('#spinner').hide();
        }
    };

    var refresh = function() {
        Stuffs.getStuffs().then(function successCallback(response) {
            $scope.stuffs = response.data;
            showSpinner(false);
        }, function errorCallback(response) {
            console.log(response.data);
            showSpinner(false);
        });
    };

    var readRecord = function(stuffId, modalTitle, action) {
        var record = null;
        Stuffs.readStuff(stuffId).then(function successCallback(response) {
            record = response.data;
            $scope.stuffName = record.name;
            $scope.currentStuffId = record._id;
            genericModalConfig(modalTitle, action);
        }, function errorCallback(response) {
            console.log(response.data);
        });
    };

    showSpinner(true);
    refresh();

    $scope.addStuff = function() {
        Stuffs.createStuff({
            'name': $scope.stuff
        }).then(function successCallback(response) {
            console.log(response.data);
            refresh();
        }, function errorCallback(response) {
            console.log(response.data);
        });
    }

    $scope.editStuffDialog = function(_id) {
        $('#modalBody').show();
        readRecord(_id, 'Edit Stuff', 'Update');
    }

    $scope.deleteStuffDialog = function(_id) {
        $('#modalBody').hide();
        readRecord(_id, 'Are you sure?', 'Delete');
    }

    $scope.handleEvents = function() {
        showSpinner(true);
        var action = $('#modalSubmitBtn')[0].textContent; //dummy action.
        if (action === 'Delete') {
            Stuffs.deleteStuff($scope.currentStuffId).then(function successCallback(response) {
                console.log(response.data);
                refresh();
            }, function errorCallback(response) {
                console.log(response.message);
            });
        } else if (action === 'Update') {
            Stuffs.updateStuff($scope.currentStuffId, {
                'name': $scope.stuffName
            }).then(function successCallback(response) {
                console.log(response.data);
                refresh();
            }, function errorCallback(response) {
                console.log(response.message);
            });
        }

        $('#genericModal').modal('toggle'); //close modal
    }

    function genericModalConfig(modalTitle, buttonState) { //build the modal title and button text
        $('#genericModal').modal('show');
        $scope.modalTitle = modalTitle;
        $scope.buttonState = buttonState;
    }
}]);