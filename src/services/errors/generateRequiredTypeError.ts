import { ValidationError } from '../../modules/interfaces';

const generateRequiredTypeError = (
    typeOfField: string,
    fieldName: string,
    isRequired = true
): ValidationError => {
    if (typeof typeOfField !== 'string') {
        throw new Error(
            'generateRequiredTypeError: typeOfField parameter is string'
        );
    }
    if (typeof fieldName !== 'string') {
        throw new Error(
            'generateRequiredTypeError: fieldName parameter is string'
        );
    }
    if (typeof isRequired !== 'boolean') {
        throw new Error(
            'generateRequiredTypeError: isRequired parameter is boolean'
        );
    }
    const requiredText = isRequired ? 'required' : 'optional';
    const error = `${fieldName} is ${requiredText}, expected - ${typeOfField}`;
    return {
        error,
        type: 'validation-error',
        code: 400,
    };
};

export default generateRequiredTypeError;
