const HttpResponse = require('../system/HttpResponse');
const Item = require('../models/ItemModel');
const List = require('../models/ListModel');

function saveItem(req, res){
    let Response = new HttpResponse(res);
    let params = req.body;
    let listId = req.params.listId;

    if(!params.content)
        return Response.badRequest();

    List.findById(listId, (err, listFound) => {
        if(err)
            return Response.error(err);
        
        if(!listFound)
            return Response.notFound({message: 'List not found.'});

        let item = new Item();
        item.content = params.content;
        
        item.save((err, itemStored) => {
            if(err)
                return Response.error(err);
        
            if(!itemStored)
                return Response.notFound({message: 'Item could not be saved.'});
            
            listFound.items.push(itemStored._id);

            listFound.save((err, listStored) => {
                if(err)
                    return Response.error(err);
        
                if(!listStored)
                    return Response.notFound({message: 'List could not be saved.'});

                return Response.success({item: itemStored});
            });
        });
    });   
}

function updateItem(req, res){
    let Response = new HttpResponse(res);
    let listId = req.params.listId;
    let itemID = req.params.itemId;
    let params = req.body;

    if(!params.content)
        return Response.badRequest();
    
    List.findById(listId, (err, listFound) => {
        if(err)
            return Response.error(err);
        
        if(!listFound)
            return Response.notFound({message: 'List not found.'});
        
        Item.findOneAndUpdate({'_id': itemID}, {'$set': {'content': params.content}}, (err, itemUpdated) => {
            if(err)
                return Response.error(err);
        
            if(!itemUpdated)
                return Response.notFound({message: 'Item could not be saved.'});
            
            return Response.success({list: listFound});
        });
    });
}

function removeItem(req, res){
    let Response = new HttpResponse(res);
    let listId = req.params.listId;
    let itemId = req.params.itemId;

    List.findById(listId, (err, listFound) => {
        if(err)
            return Response.error(err);

        if(!listFound)
            return Response.notFound({message: 'List not found.'});
            
        Item.findOneAndRemove({'_id': itemId}, (err, itemRemoved) => {
            if(err)
                return Response.error(err);

            if(!listFound)
                return Response.notFound({message: 'List not found.'});
            
            let indexToRemove = listFound.items.indexOf(itemId);
            listFound.items.splice(indexToRemove, 1);

            listFound.save((err, listUpdated) => {
                if(err)
                    return Response.error(err);

                if(!listFound)
                    return Response.notFound({message: 'List could not be saved.'});
            
                return Response.success({list: listUpdated});
            });
        });
    });
}

module.exports = {
    saveItem,
    updateItem,
    removeItem
};
