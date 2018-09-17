
//Function that obtain the name of list
function getNameL () {
    var titleOfList = $('#nameOfList').val();
    console.log(titleOfList);
    

    addNameL(titleOfList);
    $('#nameOfList').val("");
} 

var cardTemplate = "<div class='card card-template'>" +
                        "<h5 class='card-header'>Favorite  __titleOfList__</h5>" +
                            "<div class='card-body'>" +
                                "<h5 class='card-title'>First note</h5>" +
                                "<a href='#' class='btn btn-outline-info btn-add' data-toggle='modal' data-target='.add-item'>Add item</a>" +
                                "<a href='#'><i class='fas fa-trash-alt'></i></a>" +
                            "</div>" + 
                    "</div>";

function addNameL (titleOfList) {
    var template = "";
    template = cardTemplate.replace(" __titleOfList__", titleOfList);
    var containerLists = $('#container-lists');
    containerLists.append(template);
}

$(document).ready(function(){
    $('#createBtn').click (function(){
    getNameL();
    })
});