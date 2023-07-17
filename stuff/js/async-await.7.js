function retrieveCatImage(num) {
    if (typeof num !== 'number') throw new TypeError('num is not a number')
    if (num < 100 || num > 599) throw new RangeError('num is out of range (100-599)')

    return fetch(`https://http.cat/${num}.jpg`)
        .then(res => res.text())
        .then(console.log)
}

var param = 99

try {
    retrieveCatImage(param)
        .then(console.log)
        .catch(error => console.error(error.message))
} catch (error) {
    console.error(error.message)
}
// 488 - 306837b8d2ef5dd2.js: 1 num is out of range(100 - 599)