const CheckConnection = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/api/`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Request failed');
            }
            return true;
        })
        .catch((error) => {
            throw new Error(error.message)
        });
};

export default CheckConnection