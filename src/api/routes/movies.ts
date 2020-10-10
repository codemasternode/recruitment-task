import { Router } from 'express';
import MovieRepository from '../../models/movie/movie';
import { createMovie, searchMovie } from '../controllers/movies';

const router = Router();

export default (movieRepository: MovieRepository) => {
    router.post('/', createMovie(movieRepository));
    router.post('/search', searchMovie(movieRepository));
    return router;
};
