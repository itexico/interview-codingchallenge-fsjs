import express from 'express';
import List from '../models/listModel';

const FavoritesRouter = express.Router();
    
    FavoritesRouter.route('/')
        .get((req,res) => {
            List.find({}, (err, lists) => {
                res.json(lists);
            })  
        })
        //POST is used to add new content to the database.
        .post((req, res) => {
            let list = new List(req.body);
            list.save();
            res.status(201).send(list) 
        })
        //Above we'll use it to add new lists.


    // Middleware    
    FavoritesRouter.use('/:listId', (req, res, next)=>{
        List.findById( req.params.listId, (err,list)=>{
            if(err){
                res.status(500).send(err)
            }else {
                req.list = list;
            next()
            }
        })
    })

    FavoritesRouter.route('/:listId')
        .get((req,res)=>{
            res.json(req.list);
        })

        //We use PUT to edit a specific entry. In the case of our lists PUT is used to edit one list.
        .put((req, res) => {
            req.list.name = req.body.name;
            req.list.save()
            res.json(req.list)
        })
        //Above we find a list and we change the properties of the list object stored in the database with those that are passed along with the request.

        //PATCH will allow users to edit specific properties of a list object.
        .patch((req,res)=>{
            if(req.body._id){ //If the users pass an _id as one of the properties they want to edit, we ignore that request because IDs shouldn't be changed.
                delete req.body._id;
            }
            for( let b in req.body ){//for loop loops through the remaining properties from the incoming object and updates the properties found in the database with those coming through the request.
                req.list[b] = req.body[b];
            }
            req.list.save();
            res.json(req.list);  
        })
        //Above we pull the particular list from the database and modify all the properties that match the incoming information.
    
        //DETELE will allow users to delete an entire list
        .delete((req,res)=>{
            
                req.list.remove(err => {
                    if(err){
                        res.status(500).send(err)
                    }
                    else{
                        res.status(204).send('removed')
                    }
                })
            
        })

export default FavoritesRouter;