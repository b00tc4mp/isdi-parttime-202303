const express = express('express')
const { writeFile } = require('fs')

const server = express()

server.post('/upload', (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk)

    req.on('end', () => writeFile('file', content, error => {
        if (error) {
            res.status(500).json({ error: error.message })
        }

        res.status(201).send()
    }))
})

server.listen(8080, () => console.log('server up'))