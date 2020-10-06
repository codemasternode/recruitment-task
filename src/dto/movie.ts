import { Movie } from '../types/movie';

class MovieDTO {
    title: string;
    year: number;
    runtime: number;
    director: string;
    actors?: string;
    plot?: string;
    genres: [string];
    posterUrl?: string;

    constructor(movie: Movie) {
        this.title = movie.title;
        this.year = movie.year;
        this.runtime = movie.runtime;
        this.director = movie.director;
        this.posterUrl = movie.posterUrl;
        this.genres = movie.genres;
        this.plot = movie.plot;
        this.actors = movie.actors;
    }
}

export default MovieDTO;
