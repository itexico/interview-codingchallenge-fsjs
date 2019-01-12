//Function that obtain the name of list
function getNameL () {
    var titleOfList = $('#nameOfList').val();

    addNameL(titleOfList);
    $('#nameOfList').val("");
} 

var cardTemplate = "<div class='card card-template'>" +
                        "<h5 class='card-header'>Favorite  __titleOfList__</h5>" +
                            "<div class='card-body' data-parent-type='father'>" +
                                "<div class='card-title'></div>" +
                                "<a href='#' class='btn btn-outline-info btn-add' data-toggle='modal' data-target='.add-item'>Add</a>" +
                                "<a onClick='deleteItem()' class='delete-btn' href='#'><i class='fas fa-trash-alt'></i></a>" +
                            "</div>" + 
                    "</div>";


//Function that fill template
function addNameL (titleOfList) {
    var template = "";
    template = cardTemplate.replace(" __titleOfList__", titleOfList);
    var containerLists = $('#container-lists');
    containerLists.append(template);
}

//Function that obtains value of items in the fav list and adds the new item
function valueItem () {
    var newItem = $('.new-item').val();
    $('.new-item').val('');
    var contItem = document.createElement('h6');
    contItem.append(newItem);

    var generalContainer = $('.card-title');
    generalContainer.append(contItem);

    //Let to edit the content
    $('h6').attr('contentEditable','true');
}


//Function that delete an item
function deleteItem () {
    var item = $(event.currentTarget);
    var card = item.parent();
    var containerCard = card.parent();
    var generalContainer = containerCard.parent();

    generalContainer.remove();
}

$(document).ready(function(){
    $('#createBtn').click (function(){
        getNameL();
    })

    $('.add-btn').click (function(){
        valueItem();
    })
});