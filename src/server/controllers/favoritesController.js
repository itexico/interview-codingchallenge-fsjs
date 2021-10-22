import express from 'express';

import Favorites from '../models/favoritesModels.js';

const router = express.Router();

export const getFavorites = async (req, res) => {
    try {
        const favoritesList = await Favorites.find();
        res.status(200).json(favoritesList);
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
};

export const createFavorites = async (req, res) => {

    const { title, _id, owner } = req.body;

    const newFavorites = new Favorites({ title, _id, owner });

    try {
        await newFavorites.save();

        console.log("Favorites list has been created successfuly");

        res.status(201).json(newFavorites);

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong when adding to MongoDB",
            error,
        })
    }
};

export const updateFavorites = async (req, res) => {
    const { id } = req.params;
    const { title, _id, owner, items } = req.body;

    if (!id) return res.status(404).send(`No post with id: ${id}`);

    const favorite = await Favorites.findById(id);
    const updatedFavorite = { title, owner, items, _id: id };

    await Favorites.findByIdAndUpdate(id, updatedFavorite, { new: true });

    res.status(201).json(updatedFavorite);
}

export const deleteFavoritesItem = async (req, res) => {
    const { id } = req.params;
    const { title, _id, owner, items } = req.body;

    if (!id) return res.status(404).send(`No post with id: ${id}`);

    const favorite = await Favorites.findById(id);
    const updatedFavorite = { title, owner, items, _id: id };

    await Favorites.findByIdAndUpdate(id, updatedFavorite, { new: true });

    res.status(201).json(updatedFavorite);
}

export default router;