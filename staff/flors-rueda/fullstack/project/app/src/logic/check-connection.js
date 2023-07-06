import { validators } from 'com';

const { validateCallback } = validators;

const CheckConnection = (callback) => {
    validateCallback(callback);

    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
        const { status } = xhr;

        if (status !== 200) {
            const { response: json } = xhr;
            const { error } = JSON.parse(json);
            callback(new Error(error));

            return
        }

        callback(null);
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/`);

    xhr.send();
}

export default CheckConnection