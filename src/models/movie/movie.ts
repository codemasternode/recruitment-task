import { Movie, MovieValidation } from '../../types/movie';

class MovieRepository {
    private file: string;

    constructor(file: string) {
        this.file = file;
    }
}

export default MovieRepository;
