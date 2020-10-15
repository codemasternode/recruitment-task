import { SearchRequestBody } from '../../types/search';
import { generateRequiredTypeError } from '../../types/error';

class SearchBodyValidation {
    static validate(searchRequestBody: SearchRequestBody): void {
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

export { SearchBodyValidation };
