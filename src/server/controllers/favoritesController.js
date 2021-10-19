import express from 'express';

import Favorites from '../models/favoritesModels.js';

const router = express.Router();

export const getFavorites = async (req, res) => {
    try {
        const favoritesList = await Favorites.find()
        console.log(favoritesList);
        res.status(200).json(favoritesList);
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
};

export const createFavorites = async (req, res) => {

    const { title, _id, owner } = req.body;

    const newFavorites = new Favorites({ title, _id, owner })
    console.log(newFavorites);

    try {
        await newFavorites.save();

        console.log("Favorites list has been created successfuly");
        console.log(newFavorites);

        res.status(201).json(newFavorites);

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong when adding to MongoDB",
            error,
        })
    }
};

export default router;

// favorites.save()
//         .then(() =>
//             res.status(201).json({ message: "Favorites list has been added successfuly" })
//         )
//         .catch((error) =>
//             res.status(500).json({
//                 message: "Something went wrong when adding to MongoDB",
//                 error,
//             })
//         );