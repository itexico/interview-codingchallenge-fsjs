import express from 'express';

const FavoritesRouter = express.Router();
FavoritesRouter
    .get('/', (req,res) => {
        res.json([
            {
                id: 1,
                title: "Alice's Adventures in Wonderland",
                author: "Charles Lutwidge Dodgson"
            },
            {
                id: 2,
                title: "Einstein's Dreams",
                author: "Alan Lightman"
            }
        ])
    })
    .get('/2', (req,res) => {
        res.json({
            id: 2,
            title: "Einstein's Dreams",
            author: "Alan Lightman"
        })
    })

export default FavoritesRouter;