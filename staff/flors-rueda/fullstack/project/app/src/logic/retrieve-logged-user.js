import context from './context';
import { tokenUtils } from 'com';
const { extractSubFromToken } = tokenUtils;

const retrieveLoggedUser = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/users/auth/${extractSubFromToken(context.token)}`, {
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
}

export default retrieveLoggedUser