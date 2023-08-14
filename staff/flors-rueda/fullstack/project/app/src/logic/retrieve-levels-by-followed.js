import { tokenUtils } from 'com';
const { extractSubFromToken } = tokenUtils;
import context from './context';

const retrieveLevelsByFollowed = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/levels/followed/${extractSubFromToken(context.token)}`, {
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

export default retrieveLevelsByFollowed