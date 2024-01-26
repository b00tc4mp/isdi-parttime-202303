var XMLHttpRequest = require('xhr2');

const getPokemonSprite = (callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status <= 299) {
            const data = JSON.parse(xhr.responseText);
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const randomPokemonUrl = data.results[randomIndex].url;
            const xhr2 = new XMLHttpRequest();
            xhr2.open('GET', randomPokemonUrl);
            xhr2.onload = function () {
                if (xhr2.status >= 200 && xhr2.status <= 299) {
                    const pokemonData = JSON.parse(xhr2.responseText);
                    callback(null, pokemonData.sprites.front_default);
                } else {
                    callback(new Error('Failed to fetch Pokémon data'));
                }
            };
            xhr2.send();
        } else {
            callback(new Error('Failed to fetch Pokémon list'));
        }
    };
    xhr.send();
};

const generateUUID = () => {
    let date = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, character => {
        let random = Math.random() * 16;
        random = (date + random) % 16 | 0;
        date = Math.floor(date / 16);
        return (character === 'x' ? random : (date)).toString(16);
    });
};

//TODO fix on the front
module.exports = {
    getPokemonSprite,
    generateUUID
}