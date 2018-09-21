import express from 'express';
import List from '../models/listModel';

const FavoritesRouter = express.Router();

FavoritesRouter.route('/')
    .get((req,res) => {
        List.find({}, (err, lists) => {
            res.json(lists)
        })  

        // res.json([
        //     {
        //         id: 1,
        //         title: "Alice's Adventures in Wonderland",
        //         author: "Charles Lutwidge Dodgson"
        //     },
        //     {
        //         id: 2,
        //         title: "Einstein's Dreams",
        //         author: "Alan Lightman"
        //     }
        // ])
    })
    // FavoritesRouter.route('/:bookId')
    // .get((req, res) => {
    //     List.findById(req.params.bookId, (err, list) => {
    //         res.json(list)
    //     })  
    // })
    // .get('/2', (req,res) => {
    //     res.json({
    //         id: 2,
    //         title: "Einstein's Dreams",
    //         author: "Alan Lightman"
    //     })
    // })
    
    .post((req, res) => {
        let list = new List(req.body);
        list.save();
        res.status(201).send(list) 
    })
export default FavoritesRouter;