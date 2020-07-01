angular.module('myListApp').value('configuration', {
    server:"http://localhost:3000/api",
    notificationContainer: "notification-container",
    successMessage: "All operations were performed successfully",
    errorMessage: "An error has occurred, check the console for more information"
});