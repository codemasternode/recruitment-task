import fs from 'fs';
import path from 'path';
import { Movie, MovieInDB, Node } from '../../modules/interfaces';
import MovieValidation from '../../services/validation/MovieValidation';
import { SearchRequestBody, Data } from '../../modules/interfaces';
import { SearchRequestBodyValidation } from '../../services/validation';

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
        const nodes = movies.reduce((nodes: Node[], movie) => {
            node = {
                count: 0,
                highest: -1,
                value: movie,
            };
            searchRequestBody.genres?.forEach((genre, index) => {
                if (movie.genres.includes(genre)) {
                    node.count++;
                    if (node.highest === -1) {
                        node.highest = index;
                    }
                }
            });
            if (node.count !== 0) {
                nodes.push(node);
            }
            return nodes;
        }, []);

        nodes.sort((a, b) => {
            if (a.count > b.count) {
                return -1;
            } else if (a.count < b.count) {
                return 1;
            }

            if (a.highest < b.highest) {
                return -1;
            } else if (a.highest > b.highest) {
                return 1;
            } else {
                return 0;
            }
        });
        movies = nodes.map((value) => value?.value);
        return movies;
    }

    filterByDuration(
        movies: MovieInDB[],
        searchRequestBody: SearchRequestBody
    ): MovieInDB[] {
        const filtered = movies.filter((value) => {
            return (
                //@ts-ignore
                Number(value.runtime) - 10 < searchRequestBody.duration &&
                //@ts-ignore
                Number(value.runtime) + 10 > searchRequestBody.duration
            );
        });
        return filtered;
    }

    searchMovie(
        searchRequestBody: SearchRequestBody
    ): MovieInDB | MovieInDB[] | null {
        SearchRequestBodyValidation.validate(searchRequestBody);
        if (
            typeof searchRequestBody.duration !== 'undefined' &&
            typeof searchRequestBody.genres !== 'undefined'
        ) {
            const filteredByRuntime = this.filterByDuration(
                this.data.movies,
                searchRequestBody
            );
            return this.filterByGenres(filteredByRuntime, searchRequestBody);
        } else if (typeof searchRequestBody.duration !== 'undefined') {
            const filteredMovies = this.filterByDuration(
                this.data.movies,
                searchRequestBody
            );
            return {
                ...filteredMovies[
                    Math.floor(Math.random() * filteredMovies.length)
                ],
            };
        } else if (typeof searchRequestBody.genres !== 'undefined') {
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
