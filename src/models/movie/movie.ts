import fs from 'fs';
import path from 'path';
import { Movie, MovieValidation } from '../../types/movie';

interface Data {
    movies: any[];
    genres: any[];
}

class MovieRepository {
    private filePath: string;
    private movieValidation: MovieValidation;
    private data: Data;
    private idToSave: number;

    constructor(filePath: string) {
        this.filePath = path.join(__dirname, filePath);
        const data = fs.readFileSync(this.filePath, 'utf-8');

        this.data = JSON.parse(data);
        const maxID = Math.max(...this.data.movies.map((movie) => movie.id));
        this.idToSave = maxID === -Infinity ? 1 : maxID + 1;
        this.movieValidation = new MovieValidation(this.data.genres);
    }

    addMovie(movie: Movie) {
        try {
            this.movieValidation.validate(movie);
        } catch (err) {
            throw err;
        }

        this.data.movies.push({ id: this.idToSave, movie });
        const writer = fs.createWriteStream(this.filePath, 'utf8');
        writer.write(JSON.stringify(this.data, null, 3));
        this.idToSave += 1;
    }
}

export default MovieRepository;
