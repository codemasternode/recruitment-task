import { SearchRequestBody } from '../../modules/interfaces';
import { generateRequiredTypeError } from '../../services/errors';

class SearchRequestBodyValidation {
    static validate(searchRequestBody: SearchRequestBody): void {
        if (
            typeof searchRequestBody.genres !== 'undefined' &&
            !Array.isArray(searchRequestBody.genres)
        ) {
            throw generateRequiredTypeError('array of string', 'genres', false);
        }

        if (Array.isArray(searchRequestBody.genres)) {
            searchRequestBody.genres.forEach((value) => {
                if (typeof value !== 'string') {
                    throw generateRequiredTypeError(
                        'array of string',
                        'genres',
                        false
                    );
                }
            });
        }
        if (
            typeof searchRequestBody.duration !== 'number' &&
            typeof searchRequestBody.duration !== 'undefined'
        ) {
            throw generateRequiredTypeError('number', 'duration', false);
        }
    }
}

export default SearchRequestBodyValidation;
