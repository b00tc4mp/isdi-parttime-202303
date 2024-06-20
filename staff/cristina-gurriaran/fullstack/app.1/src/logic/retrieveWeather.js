import { validators } from 'com'

const { validateCallback } = validators

export default function retrieveWeather(callback){
    validateCallback(callback)

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("GET", "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/Barcelona");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
}