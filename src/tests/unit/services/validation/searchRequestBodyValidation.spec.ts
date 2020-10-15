import { expect } from 'chai';
import { generateRequiredTypeError } from '../../../../services/errors';
import { SearchRequestBodyValidation } from '../../../../services/validation';

describe('Movie Validation unit tests', () => {
    describe('Should not throw error', () => {
        it('when search request body is empty', (done) => {
            expect(() =>
                SearchRequestBodyValidation.validate({})
            ).to.not.throw();
            done();
        });
        it('when genres and duration property is defined correctly', (done) => {
            expect(() =>
                SearchRequestBodyValidation.validate({
                    genres: ['Action', 'Sci-Fi'],
                    duration: 120,
                })
            ).to.not.throw();
            done();
        });
        it('when only genres property is defined', (done) => {
            expect(() =>
                SearchRequestBodyValidation.validate({
                    genres: ['Action', 'Sci-Fi'],
                })
            ).to.not.throw();
            done();
        });
        it('when only genres duration is defined', (done) => {
            expect(() =>
                SearchRequestBodyValidation.validate({
                    duration: 120,
                })
            ).to.not.throw();
            done();
        });
    });

    describe('Should return error', () => {
        it('when property genres is different type than expected', (done) => {
            try {
                SearchRequestBodyValidation.validate({
                    // @ts-ignore
                    genres: '120',
                });
            } catch (err) {
                expect(err.error).to.equal(
                    generateRequiredTypeError(
                        'array of string',
                        'genres',
                        false
                    ).error
                );
            }
            done();
        });
        it('when property duration is different type than expected', (done) => {
            try {
                SearchRequestBodyValidation.validate({
                    // @ts-ignore
                    duration: '120',
                });
            } catch (err) {
                expect(err.error).to.equal(
                    generateRequiredTypeError('number', 'duration', false).error
                );
            }
            done();
        });
        it('when property genres is array of not strings', (done) => {
            try {
                SearchRequestBodyValidation.validate({
                    // @ts-ignore
                    genres: [1, 2, 3, 4],
                });
            } catch (err) {
                expect(err.error).to.equal(
                    generateRequiredTypeError(
                        'array of string',
                        'genres',
                        false
                    ).error
                );
            }
            done();
        });
    });
});
