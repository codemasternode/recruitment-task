import { expect } from 'chai';
import { MovieValidation } from '../../../types/movie';

const movieValidation = new MovieValidation(['action']);

describe('Movie Validation unit tests', () => {
    describe('Should return Result Success Object', () => {
        it('on properly Movie Object', (done) => {
            const result = movieValidation.validate({
                title: 'Star Wars',
                year: 1977,
                runtime: 127,
                director: 'George’a Lucasa',
                actors:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                plot:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                genres: ['action'],
            });
            expect(result).to.have.keys(['type', 'value']);
            expect(result.type).to.equal('success');
            done();
        });
    });

    describe('Should return Result Error', () => {
        it('when length on property title is over 255', (done) => {
            expect(() =>
                movieValidation.validate({
                    title: new Array(257).join(','),
                    year: 1977,
                    runtime: 127,
                    director: 'George’a Lucasa',
                    actors:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                    plot:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                    genres: ['action'],
                })
            ).to.throw();
            done();
        });

        it('when length on property director is over 255', (done) => {
            expect(() =>
                movieValidation.validate({
                    title: 'Star Wars',
                    year: 1977,
                    runtime: 127,
                    director: new Array(257).join(','),
                    actors:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                    plot:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                    genres: ['action'],
                })
            ).to.throw();
            done();
        });

        it('when genre in movie is not on genres list', (done) => {
            expect(() =>
                movieValidation.validate({
                    title: 'Star Wars',
                    year: 1977,
                    runtime: 127,
                    director: 'George’a Lucasa',
                    actors:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                    plot:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                    genres: ['sc-fi'],
                })
            ).to.throw();
            done();
        });
    });
});
