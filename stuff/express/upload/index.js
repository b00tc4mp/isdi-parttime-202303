const express = require('express')
const { createWriteStream } = require('fs')
const busboy = require('busboy')

const server = express()

server.post('/upload', (req, res) => {
    const bb = busboy({ headers: req.headers })

    bb.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info

        const ws = createWriteStream(filename)

        console.log(
            `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
            filename,
            encoding,
            mimeType
        )

        file.on('data', data => {
            console.log(`File [${name}] got ${data.length} bytes`)

            ws.write(data)
        }).on('close', () => console.log(`File [${name}] done`))
    })

    bb.on('field', (name, val, info) => console.log(`Field [${name}]: value: %j`, val))

    bb.on('close', () => res.status(201).send())

    req.pipe(bb)
})

server.listen(8080, () => console.log('server up'))