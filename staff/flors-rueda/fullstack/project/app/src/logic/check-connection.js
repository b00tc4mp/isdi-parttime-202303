const CheckConnection = () => {
    return fetch(`${import.meta.env.VITE_API_URL}/`)
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

export default CheckConnection