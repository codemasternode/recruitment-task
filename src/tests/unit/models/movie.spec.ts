import { expect } from 'chai';
import MovieRepository from '../../../models/movie/movie';
import { MovieInDB } from '../../../modules/interfaces';

const movieRepository = new MovieRepository('../../../data/db-copy.json');

describe('Movie Repository create method unit tests', () => {
    describe('Should return created movie', () => {
        it('when properly passed movie object', (done) => {
            movieRepository.addMovie({
                title: 'Star Wars',
                director: 'George Lucas',
                genres: ['Sci-Fi'],
                runtime: 127,
                year: 1998,
            });
            done();
        });
    });
    describe('Should throw error', () => {
        it('made by MovieValidation validate method', (done) => {
            expect(() => {
                movieRepository.addMovie({
                    title: 'Star Wars',
                    director: 'George Lucas',
                    genres: ['asddasasddsaads'],
                    runtime: 127,
                    year: 1998,
                });
            }).to.throw();
            done();
        });
    });
});

describe('Movie Repository searchMovie method unit test', () => {
    describe('Should return array of filtered movies', () => {
        it('when pass both duration and genres in searchRequestBody parameter', (done) => {
            const duration = 120;
            const genres = ['Action', 'Sci-Fi'];
            //@ts-ignore
            const movies: MovieInDB[] = movieRepository.searchMovie({
                genres,
                duration,
            });
            expect(movies).to.be.an('array');
            movies.forEach((movie) => {
                let counter = 0;
                let highest: number | undefined = undefined;
                genres.forEach((genre, genreIndex) => {
                    if (movie.genres.includes(genre)) {
                        counter++;
                        if (typeof highest === 'undefined') {
                            highest = genreIndex;
                        }
                    }
                });
                if (counter === 0 || typeof highest === 'undefined') {
                    throw new Error(
                        "You matched movie that doesn't have any required genres"
                    );
                }
                expect(
                    //@ts-ignore
                    Number(movie.runtime) > duration - 10 &&
                        //@ts-ignore
                        Number(movie.runtime) < duration + 10
                ).to.equal(true);
            });
            done();
        });
        it('when pass genres in searchRequestBody parameter', (done) => {
            const genres = ['Action', 'Sci-Fi'];
            //@ts-ignore
            const movies: MovieInDB[] = movieRepository.searchMovie({ genres });
            expect(movies).to.be.an('array');
            movies.forEach((movie) => {
                let counter = 0;
                let highest: number | undefined = undefined;
                genres.forEach((genre, genreIndex) => {
                    if (movie.genres.includes(genre)) {
                        counter++;
                        if (typeof highest === 'undefined') {
                            highest = genreIndex;
                        }
                    }
                });
                if (counter === 0 || typeof highest === 'undefined') {
                    throw new Error(
                        "You matched movie that doesn't have any required genres"
                    );
                }
            });
            done();
        });
    });
    describe('Should return single movie', () => {
        it('when pass only duration in searchRequestBody parameter', (done) => {
            const duration = 120;
            const movie = movieRepository.searchMovie({ duration });
            expect(movie).to.be.an('object');
            expect(
                //@ts-ignore
                Number(movie.runtime) > duration - 10 &&
                    //@ts-ignore
                    Number(movie.runtime) < duration + 10
            ).to.equal(true);
            done();
        });
        it('when pass empty object in searchRequestBody parameter', () => {
            const movie = movieRepository.searchMovie({});
            expect(movie).to.be.an('object');
        });
    });
    describe('Should throw error', () => {
        it('when genres in searchRequestBody doesn not include in avaiable genres', (done) => {
            expect(() =>
                movieRepository.searchMovie({
                    genres: ['XXXX'],
                })
            ).to.throw();
            done();
        });
    });
});
