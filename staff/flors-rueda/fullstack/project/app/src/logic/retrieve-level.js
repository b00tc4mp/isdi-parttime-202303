import { validators } from 'com';

const { validateCallback, validateId } = validators;

const retrieveLevel = (id) => {
    validateId(id);

    return fetch(`${import.meta.env.VITE_API_URL}/levels/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Request failed');
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            throw error;
        });
};

export default retrieveLevel;