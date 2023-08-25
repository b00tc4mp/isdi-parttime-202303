import { extractSubFromToken } from './tokenUtils/tokenUtils';
import context from './context';

/**
 * Retrieves levels created by the users followed by the current user.
 *
 * @returns {[object]} A Promise that resolves with an array of retrieved levels information.
 * @throws {Error} If the request fails.
 */
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