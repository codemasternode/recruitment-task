interface MovieInDB {
    id: number;
    title: string;
    year: number;
    runtime: number;
    director: string;
    actors?: string;
    plot?: string;
    genres: string[];
    posterUrl?: string;
}

export default MovieInDB;
