import { tokenUtils, validators } from 'com';
const { extractSubFromToken } = tokenUtils;
const { validateId } = validators;
import context from './context';

const retrieveLevelsSaved = (id) => {
    validateId(id, 'userId');

    return fetch(`${import.meta.env.VITE_API_URL}/api/levels/saved/${id}`, {
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
            for (let level of data) {
                level.isLevelLiked = (level.likes).includes(extractSubFromToken(context.token))
            }
            return data;
        })
        .catch((error) => {
            throw error;
        });
};

export default retrieveLevelsSaved