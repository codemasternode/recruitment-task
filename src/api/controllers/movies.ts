import { Request, Response } from 'express';
import { MovieInDB } from '../../types/movie';
import MovieRepository from '../../models/movie/movie';

const createMovie = (movieRepository: MovieRepository) => (
    req: Request,
    res: Response
): void => {
    try {
        const movie: MovieInDB = movieRepository.addMovie(req.body);
        res.send(movie);
    } catch (err) {
        res.status(400).send(err);
    }
};

export { createMovie };
