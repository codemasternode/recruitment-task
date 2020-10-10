type ValidationError = {
    type: string;
    error: string;
    code: 400;
};

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

export { ValidationError, generateRequiredTypeError };
