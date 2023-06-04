export default function retrieveRandomJoke (callback) {
    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const dadJokeJSON = JSON.parse(xhr.responseText);

        callback(null, dadJokeJSON.joke)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('GET', 'https://icanhazdadjoke.com/')
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send()
}