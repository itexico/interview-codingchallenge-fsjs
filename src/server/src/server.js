import express from 'express';
import FavoritesRouter from './routes/FavoritesRouter';

const app = express();
const port = process.env.PORT || 5656;
// routes go here
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})


app.use('/api/Favorites', FavoritesRouter);