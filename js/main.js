//Saving info from Card
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
  
  console.log("aqui manda la data");
  console.log(title);
  console.log(comment);
  console.log(favorites);
  let titleId= title.split(" ").join("-");
  console.log(titleId)
  //Card Template
  
  
  let template = `
  <div class="card offset-1" style="width: 18rem;">
  <div class="card-body">
  <h5 class="card-title headersStyle">{{title}}</h5>
  <p class="card-text">{{comment}}</p>
  </div>
  <ul class="list-group list-group-flush " id="{{dynamicId}}"  >
  <li class="list-group-item">{{favorites}}
  <button class="btn text-right">
  <i class="fas fa-edit"></i>
  </button>
  <button class="btn text-right" onClick="deleteList()" >
  <i class="fas fa-eraser" >
  </i>
  </button>  
  </li>
  </ul>
  <!--Button for adding an item-->
  <button href="#" class="btn btn-primary itemAddition" onClick="retrieveData()" data-toggle="modal" data-target="#modalAdd">Add an Item</button>
  <button href="#" class="btn btn-secondary deleteList " onClick="deleteList()" >Delete List</button>
  </div>
  `
  let finalTemplate = template.replace("{{title}}",title).replace("{{dynamicId}}",titleId).replace("{{comment}}",comment).replace("{{favorites}}",favorites);
  $("main").append(finalTemplate);
  swal("Good job!", "Lista Agregada!", "success");
}



//retrieve data from new item
function retrieveData() {
  let addingFavorite= $("#addNewItem").val();
  console.log(addingFavorite);
  let templatelist = `<li class="list-group-item deleteItem">{{addingFavorite}}
  <button class="btn text-right">
  <i class="fas fa-edit">
  </i>
  </button> <button class=" btn text-right data-toggle="modal" data-target="#modalAdd" onClick="deleteList()"  >
  <i class="fas fa-eraser"></i>
  </button> 
  </li>
  `
  let finalTemplateList = templatelist.replace("{{addingFavorite}}",addingFavorite);
  
  let hearingItem = $(event.currentTarget);
  let getchildren= hearingItem.parent();
  let getUl= getchildren.children("ul");
  let getId= $(getUl).attr("id");
  console.log(getId)
  $("#savingFavorite").click(function (e) { 
    
    $("#"+ getId).append(finalTemplateList); 
    
    
  });
  $("#addNewItem").val("");
  
}

//saving button
$("#savingChanges").click(function (e) { 
  e.preventDefault();
  getCardData(); 
});
//hearing the click favorite
// $("savingFavorite").click(function(e){
//   console.log("escuchado aqui");

//   retrieveData();
// })
//delete button
function deleteList() {
  console.log("borrado");
  let item = $(event.currentTarget);
  let card= item.parent();
  card.remove();
}
//Modal
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})