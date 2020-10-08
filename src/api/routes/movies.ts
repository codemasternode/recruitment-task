import { Router } from 'express';
import MovieRepository from '../../models/movie/movie';
import { createMovie } from '../controllers/movies';

const router = Router();

export default (movieRepository: MovieRepository) => {
    router.post('/', createMovie(movieRepository));
    return router;
};
