import { ValidationError } from '../../modules/interfaces';

const generateRequiredTypeError = (
    typeOfField: string,
    fieldName: string,
    isRequired = true
): ValidationError => {
    const requiredText = isRequired ? 'required' : 'optional';
    const error = `${fieldName} is ${requiredText}, expected - ${typeOfField}`;
    return {
        error,
        type: 'validation-error',
        code: 400,
    };
};

export default generateRequiredTypeError;
