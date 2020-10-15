import express from 'express';
import 'dotenv/config';
import moviesRoutes from './api/routes/movies';
import MovieRepository from './models/movie/movie';

const app: express.Application = express();
const PORT: string | undefined = process.env.PORT;

const movieRepository = new MovieRepository('../../../data/db.json');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/movies', moviesRoutes(movieRepository));

app.listen(PORT || '5000');

export default app;
