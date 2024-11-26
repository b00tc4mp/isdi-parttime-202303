function retrieveCatImage(num) {
    if (typeof num !== 'number') throw new TypeError('num is not a number')
    if (num < 100 || num > 599) throw new RangeError('num is out of range (100-599)')

    /*
    return fetch(`https://http.cat/${num}.jpg`)
        .then(res => res.text())
    */

    return (async () => {
        //const bytes = await fetch(`https://http.cat/${num}.jpg`).then(res => res.text())

        //const bytes = await (await fetch(`https://http.cat/${num}.jpg`)).text()

        const res = await fetch(`https://http.cat/${num}.jpg`)
        const bytes = await res.text()

        return bytes
    })()
}

var param = 200

    ; (async () => {
        try {
            const bytes = await retrieveCatImage(param)

            console.log(bytes)
        } catch (error) {
            console.error('ERROR', error.message)
        }
    })()