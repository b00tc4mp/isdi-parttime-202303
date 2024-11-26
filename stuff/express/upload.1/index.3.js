const express = require('express')
const { createWriteStream } = require('fs')

const server = express()

server.post('/upload', (req, res) => {
    const ws = createWriteStream('file')

    req.on('data', chunk => ws.write(chunk))

    req.on('end', () => res.status(201).send())
})

server.listen(8080, () => console.log('server up'))