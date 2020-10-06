interface ResultSuccess<T> {
    type: 'success';
    value: T;
}

interface ValidationError {
    type: 'validation-error';
    error: Error;
}

type Result<T> = ResultSuccess<T> | ValidationError;

export { Result, ResultSuccess, ValidationError };
