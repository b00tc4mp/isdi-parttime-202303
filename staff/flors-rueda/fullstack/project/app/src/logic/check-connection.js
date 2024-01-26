/**
 * Checks the connection to the Api
 *
 * @returns {boolean} A Promise that resolves to true if the connection is successful.
 * @throws {Error} If the connection check fails or encounters an error.
 */
const CheckConnection = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Request failed');
            }
            return true;
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};

export default CheckConnection;