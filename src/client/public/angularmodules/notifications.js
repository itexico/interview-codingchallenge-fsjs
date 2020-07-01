angular.module('myListApp')
//     .service('NotificationService', function($scope, configuration) {
//         var currentNotification;
//         this.showNotification = function(result, duration = 2000){
//             debugger;
//             var message= result ? configuration.susscessMesage : configuration.errorMessage;
//             var divElement = $scope.element(configuration.notificationContainer);
//             divElement.text = message;
//             clearTimeout(currentNotification);
//             currentNotification = setTimeout(function(){
//                 divElement.attr('display','none');
//             }, duration);
//         };
//     });
.controller('NotificationController', function($rootScope, $scope, $timeout, NotificationService){
    $rootScope.notificationList = new Array();
})
.service('NotificationService', function(configuration) {
    this.createNotificationObject = function (type) {
        var notificationObject= new Object();
        var message = type ? configuration.successMessage : configuration.errorMessage;
        notificationObject.type = type ? 'success' : 'danger';
        notificationObject.shortMessage =  type ? 'Success' : 'Error';
        notificationObject.message = message;
        return notificationObject;
    };
});