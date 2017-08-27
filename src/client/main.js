angular.module("angularList", []);

function mainController($scope, $http) {
  $scope.formData = {};
//get all the books from API
  $http.get("/books")
  .success(function(data){
    $scope.books = data;
  })
  .error(function(data){
    console.log("Error: " + data);
  });
//creates a new book and sends to API

  $scope.createBook = function(){
    $http.post("/books", $scope.formData)
      .succes(function(data){
        $scope.formData = {};
        $scope.books = data;
      })
      .error(function(data){
        console.log("Error: " + data);
      });
  };

 //delete a book with a specified id

 $scope.deleteBook = function(){
   $http.delete("/books/:id")
    .success(function(data){
      $scope.books = data;
    })
    .error(function(data){
      console.log("Error: " + data);
    });
 };

}
