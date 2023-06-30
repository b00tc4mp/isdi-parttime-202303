import { generateUUID } from './helpers/generateUUID';

const createLevel = (name, layout, callback) => {

    const xhr = new XMLHttpRequest;

    xhr.onload = () => {
        const { status } = xhr;

        if (status !== 201) {
            const { response: json } = xhr;
            const { error } = JSON.parse(json);

            callback(new Error(error));

            return;
        }

        callback(null);
    }

    xhr.onerror = () => {
        callback(new Error('connection error'));
    }

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/levels`);

    xhr.setRequestHeader('Content-Type', 'application/json');

    const id = generateUUID();
    const level = { name, layout, id };
    const json = JSON.stringify(level);

    xhr.send(json);
}

export default createLevel