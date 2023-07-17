// WARN this error should not be wrapped in a promise (it's a validation error)

async function retrieveCatImage(num) {
    if (typeof num !== 'number') throw new TypeError('num is not a number')
    if (num < 100 || num > 599) throw new RangeError('num is out of range (100-599)')

    /*
    return fetch(`https://http.cat/${num}.jpg`)
        .then(res => res.text())
        .then(bytes => console.log(bytes))
    */

    //return (async () => {
    const res = await fetch(`https://http.cat/${num}.jpg`)

    const bytes = await res.text()

    console.log(bytes)
    //})()
}

var param = 99

try {
    retrieveCatImage(param)
        .then(console.log)
        .catch(error => console.error('async ERROR', error.message))
} catch (error) {
    console.error('sync ERROR', error.message)
}
//488-306837b8d2ef5dd2.js:1 async ERROR num is out of range (100-599)