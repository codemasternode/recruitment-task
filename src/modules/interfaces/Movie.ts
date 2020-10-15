interface Movie {
    title: string;
    year: number;
    runtime: number;
    director: string;
    actors?: string;
    plot?: string;
    genres: string[];
    posterUrl?: string;
}

export default Movie;
