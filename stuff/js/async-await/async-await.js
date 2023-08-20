function retrieveCatImage(num) {
    if (typeof num !== 'number') throw new TypeError('num is not a number')
    if (num < 100 || num > 599) throw new RangeError('num is out of range (100-599)')


    // return (async () => {
    //     const res = await fetch(`https://http.cat/${num}.jpg`)
    //     const bytes = await res.text()

    //     return bytes
    // })()

    return fetch(`https://http.cat/${num}.jpg`)
        .then(res => res.text())
    //.then(bytes => bytes)
}

var param = 200

// ; (async () => {
//     try {
//         const bytes = await retrieveCatImage(param)

//         console.log(bytes)
//     } catch (error) {
//         console.error('ERROR', error.message)
//     }
// })()

try {
    retrieveCatImage(param)
        .then(bytes => console.log(bytes))
        .catch(error => console.error('ERROR', error.message))
} catch (error) {
    console.error('ERROR', error.message)
}