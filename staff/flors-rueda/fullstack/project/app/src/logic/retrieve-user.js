import { validators } from 'com';
import context from './context';

const { validateId } = validators;

const retrieveUser = (id) => {
    validateId(id, 'userId');

    return fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    })
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

export default retrieveUser;