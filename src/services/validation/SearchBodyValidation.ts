import { SearchRequestBody } from '../../types/search';
import { generateRequiredTypeError } from '../../types/error';

class SearchBodyValidation {
    static validate(searchRequestBody: SearchRequestBody) {
        if (typeof searchRequestBody.runtime !== 'number') {
            throw generateRequiredTypeError('number', 'runtime');
        }

        if (Array.isArray(searchRequestBody.genres)) {
            searchRequestBody.genres.forEach((value) => {
                if (typeof value === 'undefined') {
                    throw generateRequiredTypeError(
                        'array of string',
                        'genres',
                        false
                    );
                }
            });
        }
    }
}

export { SearchBodyValidation };
