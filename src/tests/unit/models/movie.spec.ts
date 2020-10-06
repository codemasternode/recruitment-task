import { expect } from 'chai';
import MovieRepository from '../../../models/movie/movie';

const movieRepository = new MovieRepository('../../../data/db-copy.json');

describe('Movie Repository unit tests', () => {
    describe('Should return created Movie Object', () => {
        it('on properly Movie Object', (done) => {
            const result = movieRepository.addMovie({
                title: 'Star Wars',
                year: 1977,
                runtime: 127,
                director: 'George’a Lucasa',
                actors:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                plot:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                genres: ['Sci-Fi'],
            });
            done();
        });
    });
});
