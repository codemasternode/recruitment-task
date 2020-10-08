type ValidationError = {
    type: 'validation-error';
    error: string;
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
    };
};

export { ValidationError, generateRequiredTypeError };
