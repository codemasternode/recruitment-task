import { Result } from './result';

type Movie = {
    title: string;
    year: number;
    runtime: number;
    director: string;
    actors?: string;
    plot?: string;
    genres: string[];
    posterUrl?: string;
};

type MovieInDB = {
    id: number;
    title: string;
    year: number;
    runtime: number;
    director: string;
    actors?: string;
    plot?: string;
    genres: string[];
    posterUrl?: string;
};

const generateRequiredTypeError = (
    typeOfField: string,
    fieldName: string,
    isRequired = true
) => {
    const requiredText = isRequired ? 'required' : 'optional';
    const error = `${fieldName} is ${requiredText}, expected - ${typeOfField}`;
    return {
        error,
        type: 'validation-error',
    };
};

class MovieValidation {
    private genres: string[];

    constructor(genres: string[]) {
        this.genres = genres;
    }

    validate(movie: Movie): void {
        if (typeof movie.title !== 'string') {
            throw generateRequiredTypeError('string', 'title');
        }

        if (typeof movie.year !== 'number') {
            throw generateRequiredTypeError('number', 'year');
        }

        if (typeof movie.runtime !== 'number') {
            throw generateRequiredTypeError('number', 'runtime');
        }

        if (typeof movie.director !== 'string') {
            throw generateRequiredTypeError('string', 'director');
        }

        if (typeof movie.genres === 'undefined') {
            throw generateRequiredTypeError('array of strings', 'genres');
        }

        if (
            typeof movie.actors !== 'undefined' &&
            typeof movie.actors !== 'string'
        ) {
            throw generateRequiredTypeError('string', 'actors', false);
        }

        if (
            typeof movie.plot !== 'undefined' &&
            typeof movie.plot !== 'string'
        ) {
            throw generateRequiredTypeError('string', 'plot', false);
        }

        if (
            typeof movie.posterUrl !== 'undefined' &&
            typeof movie.posterUrl !== 'string'
        ) {
            throw generateRequiredTypeError('string', 'posterUrl', false);
        }

        if (movie.genres.length === 0) {
            throw {
                type: 'validation-error',
                error: 'Genre has zero length',
            };
        }

        movie.genres.forEach((genre) => {
            if (!this.genres.includes(genre)) {
                throw {
                    type: 'validation-error',
                    error: `Genre: ${genre} is not on the list of avaiable genres, avaiable types: ${this.genres.join(
                        ','
                    )} `,
                };
            }
        });

        if (movie.title.length > 255) {
            throw {
                type: 'validation-error',
                error: `Title: ${movie.title} is not valid, max 255 characters.`,
            };
        }

        if (movie.director.length > 255) {
            throw {
                type: 'validation-error',
                error: `Director: ${movie.director} is not valid, max 255 characters.`,
            };
        }
    }
}

export { Movie, MovieValidation, MovieInDB, generateRequiredTypeError };
