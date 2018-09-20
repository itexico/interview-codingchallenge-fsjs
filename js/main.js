
//Saving info
function getCardData() {
  let title = $("#titleId").val();
  let comment= $("#commentId").val();
  let favorites= $("#addTaste").val();
  console.log(title, comment, favorites);
  
  addCardData(title,comment,favorites); 
  
  $("#titleId").val("");
  $("#commentId").val("");
  $("#addTaste").val("");
  
}
//Adding data
function addCardData(title,comment,favorites) {
  
  console.log("aqui manda la data")
  console.log(title);
  console.log(comment);
  console.log(favorites);

  //Card Template

  let template = `
  <div class="card offset-1" style="width: 18rem;">
  <div class="card-body">
  <h5 class="card-title">{{title}}</h5>
  <p class="card-text">{{comment}}</p>
  </div>
  <ul class="list-group list-group-flush">
  <li class="list-group-item">{{favorites}} <button><i class="fas fa-edit"></i></button><button><i class="fas fa-eraser"></i></button> </li>
  </ul>
  <!--Button for adding an item-->
  <button href="#" class="btn btn-primary" data-toggle="modal" data-target="#modalAdd">Add an Item</button>
  <button href="#" class="btn btn-secondary deleteList " data-toggle="modal"  >Delete List</button>

  </div>
  `
  let finalTemplate = template.replace("{{title}}",title).replace("{{comment}}",comment).replace("{{favorites}}",favorites);
  $("main").append(finalTemplate);
    swal("Good job!", "Lista Agregada!", "success");
}

//saving button
$("#savingChanges").click(function (e) { 
  e.preventDefault();
  getCardData(); 
});
//delete button
$(".deleteList").click(function (e) {
  console.log(event.target)
  
});
//Modal
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})