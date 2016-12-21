/**
* Users DataService
* Uses embedded, hard-coded data model; acts asynchronously to simulate
* remote data service call(s).
*
* @returns {{loadAll: Function}}
* @constructor
*/
function UsersDataService($q,$http) {

    var apiPort=8081;
    var url=`http://localhost:${apiPort}/api/lists`;
    var mapUsers=function(data){console.log(data);};


    return {
        loadAllUsers: function() {
            return $http.get(url);
        },
        saveList: function(name) {
            return $http.post(url,angular.toJson({name}));
        },
        deleteList: function(listId) {
            return $http.delete(`${url}/${listId}`);
        },
        saveItem: function(listId,itemName) {
            return $http.put(`${url}/${listId}`,angular.toJson({name:itemName}));
        }
    };

}

export default ['$q','$http', UsersDataService];
