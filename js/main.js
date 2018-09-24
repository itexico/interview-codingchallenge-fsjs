//Values for card
$("#savingChanges").click(function (e) { 
  e.preventDefault();
  let title = $("#titleId").val();
  let comment= $("#commentId").val();
  let favorites= $("#addTaste").val();
  console.log(title, comment, favorites);

  if (title === "" || comment ===""|| favorites=="") {
    alert("all inputs must be filled")
  }else{
    addCardData(title,comment,favorites); 
    
  }
  $("#titleId").val("");
  $("#commentId").val("");
  $("#addTaste").val("");
  
  
});
//Adding data to card
function addCardData(title,comment,favorites) {
  
  console.log("data moved");
  
  let titleId= title.toLowerCase().split(" ").join("-");
  console.log(titleId)
  //Card Template literal creating a dynamic Id from the title
  let template = `
  <div class="card offset-1" style="width: 18rem;">
  <div class="card-body">
  <h5 class="card-title headersStyle">{{title}}</h5>
  <p class="card-text">{{comment}}</p>
  </div>
  <ul class="list-group list-group-flush " id="{{dynamicId}}"  >
  <li class="list-group-item" >{{favorites}}
  <button class="btn text-right editItem">
  <i class="fas fa-edit"></i>
  </button>
  <button class="btn text-right" onClick="deleteList()" >
  <i class="fas fa-eraser" >
  </i>
  </button>  
  </li>
  </ul>
  <!--Button for adding an item-->
  <button href="#" class="btn btn-primary " onClick="retrieveData()" data-toggle="modal" data-target="#modalAdd">Add an Item</button>
  <button href="#" class="btn btn-secondary deleteList " onClick="deleteList()" >Delete List</button>
  </div>
  `
  let finalTemplate = template.replace("{{title}}",title).replace("{{dynamicId}}",titleId).replace("{{comment}}",comment).replace("{{favorites}}",favorites);
  $("main").append(finalTemplate);
  swal("Good job!", "Added List", "success");
}

//retrieve data from new item

function retrieveData() {

  let addingItem= $("#addNewItem").val();
  console.log(addingItem);
  let hearingItem = $(event.currentTarget).parent().children("ul");
  // let getchildren= hearingItem.parent();
  // let getUl= getchildren.children("ul");
  let getId= $(hearingItem).attr("id");
  console.log(getId)
  let templatelist =
   `<li class="list-group-item">{{addingItem}}
   <button class="btn text-right editItem">
   <i class="fas fa-edit"></i>
   </button>
   <button class="btn text-right" onClick="deleteList()" >
   <i class="fas fa-eraser" >
   </i>
   </button>  
   </li>
  `
  let finalTemplateList = templatelist.replace("{{addingItem}}",addingItem);
 
  $("#savingFavorite").click(function () { 
    
    $("#"+ getId).append(finalTemplateList); 
    
    
  });
  
}
$(".editItem").click(function (e) { 
  e.preventDefault();
  console.log("entre");
  
});


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