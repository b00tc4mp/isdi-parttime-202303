import { validators, tokenUtils } from 'com';
import context from './context';
const { extractSubFromToken } = tokenUtils;
const { validateName } = validators;

const searchLevels = (name) => {
    validateName(name);

    return fetch(`${import.meta.env.VITE_API_URL}/levels/search/${name}`, {
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

export default searchLevels;