import { expect } from 'chai';
import { generateRequiredTypeError } from '../../../types/error';
import MovieValidation from '../../../services/validation/MovieValidation';

const movieValidation = new MovieValidation(['action']);

describe('Movie Validation unit tests', () => {
    describe('Should not throw error', () => {
        it('when required properties are defined', (done) => {
            expect(() =>
                movieValidation.validate({
                    year: 1977,
                    runtime: 127,
                    director: 'George’a Lucasa',
                    title: 'abc',
                    genres: ['action'],
                })
            ).to.not.throw();
            done();
        });
        it('when optional property is defined', (done) => {
            expect(() =>
                movieValidation.validate({
                    year: 1977,
                    runtime: 127,
                    director: 'George’a Lucasa',
                    title: 'abc',
                    genres: ['action'],
                    plot: 'asddsadsaadsdasdsa',
                })
            ).to.not.throw();
            done();
        });
        it('when optional property is undefined', (done) => {
            expect(() =>
                movieValidation.validate({
                    year: 1977,
                    runtime: 127,
                    director: 'George’a Lucasa',
                    title: 'abc',
                    genres: ['action'],
                })
            ).to.not.throw();
            done();
        });
    });

    describe('Should return error', () => {
        it('when property genres is undefined', (done) => {
            try {
                movieValidation.validate(
                    JSON.parse(`
                {
                    "year": 1977,
                    "runtime": 127,
                    "director": "George’a Lucasa",
                    "title":"abc"
                }
                    `)
                );
            } catch (err) {
                expect(err.error).to.equal(
                    generateRequiredTypeError('array of strings', 'genres')
                        .error
                );
            }
            done();
        });
        it('when property title is undefined', (done) => {
            try {
                movieValidation.validate(
                    JSON.parse(`
                {
                    "year": 1977,
                    "runtime": 127,
                    "director": "George’a Lucasa",
                    "genres":["action"]
                }
                    `)
                );
            } catch (err) {
                expect(err.error).to.equal(
                    generateRequiredTypeError('string', 'title').error
                );
            }
            done();
        });
        it('when property year is undefined', (done) => {
            try {
                movieValidation.validate(
                    JSON.parse(`
                {
                    "title": "asd",
                    "runtime": 127,
                    "director": "George’a Lucasa",
                    "genres":["action"]
                }
                    `)
                );
            } catch (err) {
                expect(err.error).to.equal(
                    generateRequiredTypeError('number', 'year').error
                );
            }
            done();
        });
        it('when property year is different type than number', (done) => {
            try {
                movieValidation.validate(
                    JSON.parse(`
                {
                    "title": "asd",
                    "runtime": 127,
                    "director": "George’a Lucasa",
                    "genres":["action"],
                    "year": "2015"
                }
                    `)
                );
            } catch (err) {
                expect(err.error).to.equal(
                    generateRequiredTypeError('number', 'year').error
                );
            }
            done();
        });
        it('when optional property plot is defined but her type is different than expected', (done) => {
            try {
                movieValidation.validate(
                    JSON.parse(`
                {
                    "title": "asd",
                    "runtime": 127,
                    "director": "George’a Lucasa",
                    "genres":["action"],
                    "year": 2015,
                    "plot": ["asd","bcd"]
                }
                    `)
                );
            } catch (err) {
                expect(err.error).to.equal(
                    generateRequiredTypeError('string', 'plot', false).error
                );
            }
            done();
        });
        it('when property genres has zero length', (done) => {
            try {
                movieValidation.validate(
                    JSON.parse(`
                {
                    "title": "asd",
                    "runtime": 127,
                    "director": "George’a Lucasa",
                    "genres":[],
                    "year": 2015
                }
                    `)
                );
            } catch (err) {
                expect(err.error).to.equal('Genre has zero length');
            }
            done();
        });
        it('when property genres has values different than genres in database', (done) => {
            try {
                movieValidation.validate(
                    JSON.parse(`
                {
                    "title": "asd",
                    "runtime": 127,
                    "director": "George’a Lucasa",
                    "genres":["sci-fi"],
                    "year": 2015
                }
                    `)
                );
            } catch (err) {
                expect(err.error).to.contain(
                    'Genre: sci-fi is not on the list of avaiable genres, avaiable types:'
                );
            }
            done();
        });

        it('when property title is more than 255 characters', (done) => {
            const title = new Array(257).join('t');
            try {
                movieValidation.validate({
                    year: 1977,
                    runtime: 127,
                    director: 'George’a Lucasa',
                    title,
                    genres: ['action'],
                });
            } catch (err) {
                expect(err.error).to.equal(
                    `Title: ${title} is not valid, max 255 characters.`
                );
            }
            done();
        });
        it('when property director is more than 255 characters', (done) => {
            const director = new Array(257).join('d');
            try {
                movieValidation.validate({
                    year: 1977,
                    runtime: 127,
                    director,
                    title: 'abc',
                    genres: ['action'],
                });
            } catch (err) {
                expect(err.error).to.equal(
                    `Director: ${director} is not valid, max 255 characters.`
                );
            }
            done();
        });
    });
});
