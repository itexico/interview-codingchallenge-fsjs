export const getAllFavorites = async (req, res) => {
    try {
        const favoritesList = await Favorites.find()
        console.log(favoritesList);
        res.status(200).json(favoritesList);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

export const postFavorites = async (req, res) => {
    const favorites = req.body

    try {
        await newfavorites.save();
        console.log("Favorites list has been added successfuly");
        res.status(201).json(newfavorites)

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong when adding to MongoDB",
            error,
        })
    }
};


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