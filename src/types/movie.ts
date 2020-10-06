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

class MovieValidation {
    private genres: string[];

    constructor(genres: string[]) {
        this.genres = genres;
    }

    validate(movie: Movie): Result<undefined> {
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

        if (movie.title.length > 255) {
            throw {
                type: 'validation-error',
                error: new Error(
                    `Title: ${movie.title} is not valid. Validation schema: required, string, max 255 characters.`
                ),
            };
        }

        if (movie.director.length > 255) {
            throw {
                type: 'validation-error',
                error: new Error(
                    `Director: ${movie.director} is not valid. Validation schema: required, string, max 255 characters.`
                ),
            };
        }

        return {
            type: 'success',
            value: undefined,
        };
    }
}

export { Movie, MovieValidation };
