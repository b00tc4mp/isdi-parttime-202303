const STEP = 5
let pos = 0

setInterval(() => {
    console.clear()

    console.log(' '.repeat(pos), '🚘')
    pos += STEP
}, 200)