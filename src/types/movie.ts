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

export { Movie, MovieInDB };
