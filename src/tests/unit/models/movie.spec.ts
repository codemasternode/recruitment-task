import { expect } from 'chai';
import MovieRepository from '../../../models/movie/movie';
import { MovieInDB } from '../../../types/movie';

const movieRepository = new MovieRepository('../../../data/db-copy.json');

describe('Movie Repository unit tests', () => {
    describe('Should return created movie', () => {
        it('when properly passed movie object', (done) => {
            const movie: MovieInDB = movieRepository.addMovie({
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
