const express = require('express')
const { writeFile } = require('fs')

const server = express()

server.post('/upload', (req, res) => {
    const bodyparts = []
    let bodylength = 0

    req.on('data', function (chunk) {
        bodyparts.push(chunk)

        bodylength += chunk.length
    })

    req.on('end', function () {
        const body = new Buffer(bodylength)

        let bodyPos = 0

        for (let i = 0; i < bodyparts.length; i++) {
            bodyparts[i].copy(body, bodyPos, 0, bodyparts[i].length)

            bodyPos += bodyparts[i].length
        }

        writeFile('file', body, error => {
            if (error) {
                res.status(500).json({ error: error.message })
            }

            res.status(201).send()
        })
    })
})

server.listen(8080, () => console.log('server up'))