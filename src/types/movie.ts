import { Result } from './result';

type Movie = {
    title: string;
    year: number;
    runtime: number;
    director: string;
    actors?: string;
    plot?: string;
    genres: [string];
    posterUrl?: string;
};

class MovieValidation {
    private genres: [string];

    constructor(genres: [string]) {
        this.genres = genres;
    }

    validate(movie: Movie): Result<Movie> {
        movie.genres.forEach((genre) => {
            if (!this.genres.includes(genre)) {
                throw {
                    type: 'validation-error',
                    error: new Error(
                        `Genre: ${genre} is not on the list of avaiable genres, avaiable types: ${this.genres.join(
                            ','
                        )}`
                    ),
                };
            }
        });

        const max255CharactersRegex = new RegExp(/^[a-z]{0,255}$/);

        if (!max255CharactersRegex.test(movie.title)) {
            throw {
                type: 'validation-error',
                error: new Error(
                    `Title: ${movie.title} is not valid. Validation schema: required, string, max 255 characters.`
                ),
            };
        }

        if (!max255CharactersRegex.test(movie.director)) {
            throw {
                type: 'validation-error',
                error: new Error(
                    `Director: ${movie.director} is not valid. Validation schema: required, string, max 255 characters.`
                ),
            };
        }

        return {
            type: 'success',
            value: movie,
        };
    }
}

export { Movie, MovieValidation };
