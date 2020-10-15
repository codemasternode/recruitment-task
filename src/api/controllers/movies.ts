import { Request, Response } from 'express';
import { MovieInDB } from '../../modules/interfaces';
import MovieRepository from '../../models/movie/movie';

const createMovie = (movieRepository: MovieRepository) => (
    req: Request,
    res: Response
): void => {
    try {
        const movie: MovieInDB = movieRepository.addMovie(req.body);
        res.send(movie);
    } catch (err) {
        res.status(err.code).send(err);
    }
};

const searchMovie = (movieRepository: MovieRepository) => (
    req: Request,
    res: Response
): void => {
    try {
        const movies:
            | MovieInDB[]
            | MovieInDB
            | null = movieRepository.searchMovie(req.body);
        if (movies === null) {
            res.send({ movies: '0 results' });
        } else if (Array.isArray(movies)) {
            res.send({
                movies: [...movies],
            });
        } else {
            res.send({
                movie: { ...movies },
            });
        }
    } catch (err) {
        res.status(err.code).send(err);
    }
};

export { createMovie, searchMovie };
