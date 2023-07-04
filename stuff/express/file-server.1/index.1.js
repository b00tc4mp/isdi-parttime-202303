const express = require('express')
const { createWriteStream } = require('fs')
const busboy = require('busboy')

const server = express()

server.get('/', (req, res) => res.send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Server</title>
</head>

<body>
    <h1>File Server</h1>

    <p>Welcome!</p>

    <a href="/upload">Upload a file</a>
</body>

</html>`))

server.get('/upload', (req, res) => res.send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Server</title>
</head>

<body>
    <h1>File Server</h1>

    <form method="POST" action="/upload" enctype="multipart/form-data">
        <input type="file" name="file">
        <button>Upload</button>
    </form>
</body>

</html>`))

server.post('/upload', (req, res) => {
    const bb = busboy({ headers: req.headers })

    bb.on('file', (name, file, info) => {
        const { filename, encoding, mimeType } = info

        const ws = createWriteStream(`files/${filename}`)

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

    bb.on('close', () => res.status(201).send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>File Server</title>
    </head>
    
    <body>
        <h1>File Server</h1>
    
        <p>File uploaded!</p>
    </body>
    
    </html>`))

    req.pipe(bb)
})

server.listen(8080, () => console.log('server up'))