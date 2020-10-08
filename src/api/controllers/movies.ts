import { Request, Response } from 'express';
import { MovieInDB, Movie } from '../../types/movie';
import MovieRepository from '../../models/movie/movie';

const createMovie = (movieRepository: MovieRepository) => (
    req: Request,
    res: Response
): void => {
    try {
        const movie: MovieInDB = movieRepository.addMovie(req.body as Movie);
        res.send({ movie });
    } catch (err) {
        console.log(err);
    }
};

export { createMovie };
