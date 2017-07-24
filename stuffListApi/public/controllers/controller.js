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

    stuffsFactory.deleteAllStuff = function() {
        return $http.delete('/stuffs');
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
            putRecordInCategory();
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
            $scope.stuffCategory = record.category;
            $scope.currentStuffId = record._id;
            genericModalConfig(modalTitle, action);
        }, function errorCallback(response) {
            console.log(response.data);
        });
    };

    var putRecordInCategory = function() {
        var categories = [];
        $scope.stuffCategorized = categories;

        for (var i = 0; i < $scope.stuffs.length; i++) {
            if (categories.length) {
                var match = false;
                var counter = categories.length;
                for (var j = 0; j < counter; j++) {
                    if (categories[j].category.toLowerCase().indexOf($scope.stuffs[i].category.toLowerCase()) > -1) {
                        categories[j].names.push($scope.stuffs[i].name);
                        match = true;
                        continue;
                    } else if ((j === categories.length - 1) && !match) {
                        match = false;
                        categories.push({
                            'category': $scope.stuffs[i].category,
                            'names': [$scope.stuffs[i].name]
                        });
                    }
                }
            } else {
                categories.push({
                    'category': $scope.stuffs[i].category,
                    'names': [$scope.stuffs[i].name]
                });
            }
        }
    }

    showSpinner(true);
    refresh();

    $scope.onFetchData = function() {
        refresh();
    }

    $scope.createStuffDialog = function() {
        $('#modalBody').show();
        $('#modalSubmitBtn').prop('disabled', true);
        $scope.stuffName = null; //cleaning the inputs.
        $scope.stuffCategory = null;
        genericModalConfig('Create a stuff you love ❤', 'Create');
    }

    $scope.editStuffDialog = function(_id) {
        $('#modalBody').show();
        readRecord(_id, 'Edit Stuff', 'Update');
    }

    $scope.deleteStuffDialog = function(_id) {
        $('#modalBody').hide();
        readRecord(_id, 'Do you really want to delete this stuff?', 'Delete');
    }

    $scope.deleteAllStuffDialog = function() {
        $('#modalBody').hide();
        $('#modalSubmitBtn').prop('disabled', false);
        genericModalConfig('Do you really want to delete all stuff?', 'Delete All');
    }

    $scope.handleEvents = function() {
        showSpinner(true);
        var action = $('#modalSubmitBtn')[0].textContent; //dummy action.
        if (action === 'Create') {
            Stuffs.createStuff({
                'name': $scope.stuffName,
                'category': $scope.stuffCategory
            }).then(function successCallback(response) {
                console.log(response.data);
                refresh();
            }, function errorCallback(response) {
                console.log(response.data);
            });
        } else if (action === 'Delete') {
            Stuffs.deleteStuff($scope.currentStuffId).then(function successCallback(response) {
                console.log(response.data);
                refresh();
            }, function errorCallback(response) {
                console.log(response.message);
            });
        } else if (action === 'Update') {
            Stuffs.updateStuff($scope.currentStuffId, {
                'name': $scope.stuffName,
                'category': $scope.stuffCategory
            }).then(function successCallback(response) {
                console.log(response.data);
                refresh();
            }, function errorCallback(response) {
                console.log(response.message);
            });
        } else if (action === 'Delete All') {
            Stuffs.deleteAllStuff($scope.currentStuffId, {}).then(function successCallback(response) {
                console.log(response.data);
                refresh();
            }, function errorCallback(response) {
                console.log(response.message);
            });
        }

        $('#genericModal').modal('toggle'); //close modal.
    }

    function genericModalConfig(modalTitle, buttonState) { //build the modal title and button text.
        $('#genericModal').modal('show');
        $scope.modalTitle = modalTitle;
        $scope.buttonState = buttonState;
    }
}]);