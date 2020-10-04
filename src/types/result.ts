type ResultSuccess<T> = { type: 'success'; value: T };

type ValidationError = { type: 'validation-error'; error: Error };

type Result<T> = ResultSuccess<T> | ValidationError;

export { Result, ResultSuccess, ValidationError };
