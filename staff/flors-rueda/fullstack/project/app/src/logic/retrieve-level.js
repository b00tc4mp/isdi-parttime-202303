import { validators, tokenUtils } from 'com';
import context from './context';
const { extractSubFromToken } = tokenUtils;
const { validateId } = validators;

const retrieveLevel = (id) => {
    validateId(id, 'levelId');

    return fetch(`${import.meta.env.VITE_API_URL}/levels/${id}`, {
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
            data.isLevelLiked = (data.likes).includes(extractSubFromToken(context.token))
            return data;
        })
        .catch((error) => {
            throw error;
        });
};

export default retrieveLevel;