const HttpResponse = require('../system/HttpResponse');
const List = require('../models/ListModel');

// GET '/lists' retrieves lists from user
function getLists(req, res){
    let Response = new HttpResponse(res);

    List.find().populate('items').exec((err, listsFound) => {
        if(err)
            return Response.error(err);
        
        return Response.success({lists: listsFound});
    });
}

// GET '/list/:id' retrieves list from a user by a given ID
function getList(req, res){
    let Response = new HttpResponse(res);
    let listId = req.params.id;

    List.findById(listId).populate('items').exec((err, listFound) => {
        if(err)
            return Response.error(err);
        
        if(!listFound)
            return Response.notFound({message: 'List not found.'});

        return Response.success({list: listFound});
    });
}

// POST '/list' saves a new list
function saveList(req, res){
    //Collecting request body params
    let Response = new HttpResponse(res);
    let params = req.body;

    if(!params.title)
        return Response.badRequest();
    
    //Creating a new list object
    //Allocating received values to list object
    let list = new List();
    list.title = params.title;

    list.save((err, listStored) => {
        if(err)
            return Response.error(err);
    
        if(!listStored)
            return Response.notFound({message: 'List could not be saved.'});
    
        return Response.success({list: listStored});
    });
}

// PUT '/list/:id' updates list from a user by a given ID
function updateList(req, res){
    //Collecting request body params
    let Response = new HttpResponse(res);
    let params = req.body;
    let listId = req.params.id;

    if(!params.title)
        return Response.badRequest();

    List.findOneAndUpdate({'_id': listId}, {'$set': {'title':params.title}}, {new: true},(err, listUpdated) => {
        if(err)
            return Response.error(err);
    
        if(!listUpdated)
            return Response.notFound({message: 'List not found.'});

        return Response.success({list: listUpdated});
    });
}

// DELETE '/list/:id' deletes list from user by a given ID
function removeList(req, res){
    let Response = new HttpResponse(res);
    let listId = req.params.id;

    List.findByIdAndDelete(listId, (err, listRemoved) => {
        if(err)
            return Response.error(err);
        
        if(!listRemoved)
            return Response.notFound({message: 'List not found.'});
        
        return Response.success({list: listRemoved});
    });
}

module.exports = {
    getLists,
    getList,
    saveList,
    updateList,
    removeList
};
