/* tslint:disable */
import { expect } from 'chai';
import { generateRequiredTypeError } from '../../../../services/errors';

describe('Test generateRequiredTypeError', () => {
    describe('Should return properly constructed string', () => {
        it('when call with only 2 parameters', () => {
            const fieldName = 'test';
            const typeOfField = 'string';
            const error = generateRequiredTypeError(typeOfField, fieldName);
            expect(error).to.deep.include({
                error: `${fieldName} is required, expected - ${typeOfField}`,
                code: 400,
                type: 'validation-error',
            });
        });
        it('when call with 3 parameters', () => {
            const fieldName = 'test';
            const typeOfField = 'string';
            const error = generateRequiredTypeError(
                typeOfField,
                fieldName,
                false
            );
            expect(error).to.deep.include({
                error: `${fieldName} is optional, expected - ${typeOfField}`,
                code: 400,
                type: 'validation-error',
            });
        });
    });
    describe('Should throw error', () => {
        it('when call with typeOfField as different type than expected', () => {
            // @ts-ignore
            expect(() => generateRequiredTypeError(123, 'name')).to.throw();
        });
        it('when call with fieldName as different type than expected', () => {
            // @ts-ignore
            expect(() => generateRequiredTypeError('string', 123)).to.throw();
        });
        it('when call with isRequired as different type than expected', () => {
            expect(() =>
                // @ts-ignore
                generateRequiredTypeError('string', 'name', 'optional')
            ).to.throw();
        });
        it('when call without any parameters', () => {
            // @ts-ignore
            expect(() => generateRequiredTypeError()).to.throw();
        });
    });
});
