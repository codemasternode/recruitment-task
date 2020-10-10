import fs from 'fs';
import path from 'path';
import { Movie, MovieInDB } from '../../types/movie';
import MovieValidation from '../../services/validation/MovieValidation';
import { SearchRequestBody } from '../../types/search';
import { SearchBodyValidation } from '../../services/validation/SearchBodyValidation';
import { Node } from '../../types/node';
import compareTwoNumber from '../../utility/compareTwoNumber';

interface Data {
    movies: MovieInDB[];
    genres: string[];
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

    addMovie(movie: Movie): MovieInDB {
        try {
            this.movieValidation.validate(movie);
        } catch (err) {
            throw err;
        }
        const movieToCreate: MovieInDB = { id: this.idToSave, ...movie };
        this.data.movies.push(movieToCreate);
        const writer = fs.createWriteStream(this.filePath, 'utf8');
        writer.write(JSON.stringify(this.data, null, 3));
        this.idToSave += 1;
        return movieToCreate;
    }

    filterByGenres(
        movies: MovieInDB[],
        searchRequestBody: SearchRequestBody
    ): MovieInDB[] {
        searchRequestBody.genres?.forEach((genre) => {
            if (!this.data.genres.includes(genre)) {
                throw {
                    type: 'validation-error',
                    error: `Genre: ${genre} doesn't inclued on list of avaiable genres: ${this.data.genres}`,
                    code: 400,
                };
            }
        });

        let node: Node;
        const nodes = movies.map((movie) => {
            node = {
                count: 0,
                highest: undefined,
                value: movie,
            };
            searchRequestBody.genres?.forEach((genre, index) => {
                if (movie.genres.includes(genre)) {
                    node.count++;
                    if (node.highest === undefined) {
                        node.highest = index;
                    }
                }
            });
            if (node.count !== 0) {
                return node;
            }
        });

        nodes.sort((a, b) => {
            return (
                compareTwoNumber(a?.count, b?.count, -1) ||
                compareTwoNumber(a?.highest, a?.highest, 1)
            );
        });
        movies = nodes.map((value) => value?.value);
        return movies;
    }

    filterByRuntime(
        movies: MovieInDB[],
        searchRequestBody: SearchRequestBody
    ): MovieInDB[] {
        const filtered = movies.filter((value) => {
            return (
                Number(value.runtime) - 10 < searchRequestBody.runtime &&
                Number(value.runtime) + 10 > searchRequestBody.runtime
            );
        });
        console.log(filtered);
        return filtered;
    }

    searchMovie(
        searchRequestBody: SearchRequestBody
    ): MovieInDB | MovieInDB[] | null {
        SearchBodyValidation.validate(searchRequestBody);

        if (
            searchRequestBody.runtime !== undefined &&
            searchRequestBody.genres !== undefined
        ) {
            const filteredByRuntime = this.filterByRuntime(
                this.data.movies,
                searchRequestBody
            );
            return this.filterByGenres(filteredByRuntime, searchRequestBody);
        } else if (searchRequestBody.runtime !== undefined) {
            const filteredMovies = this.filterByRuntime(
                this.data.movies,
                searchRequestBody
            );
            console.log(filteredMovies);
            return {
                ...filteredMovies[
                    Math.floor(Math.random() * filteredMovies.length)
                ],
            };
        } else if (searchRequestBody.genres !== undefined) {
            return this.filterByGenres(this.data.movies, searchRequestBody);
        } else {
            if (this.data.movies.length !== 0) {
                const movie = this.data.movies[
                    Math.floor(Math.random() * this.data.movies.length)
                ];
                return {
                    ...movie,
                };
            }
            return null;
        }
    }
}

export default MovieRepository;
