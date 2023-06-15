const express = require('express')
const { createWriteStream, readdir, createReadStream } = require('fs')
const busboy = require('busboy')
const { authenticateUser } = require('./logic')

const server = express()

const context = {}

server.get('/', (req, res) => {
    if (context.userId)
        readdir('files', (error, files) => {
            if (error) {
                res.status(500).send(`<h1>${error}</h1>`)

                return
            }

            res.send(`<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>File Server</title>
        </head>

        <body>
            <h1>File Server</h1>

            <p>Welcome!</p>

            <form method="POST" action="/" enctype="multipart/form-data">
                <input type="file" name="file">
                <button>Upload</button>
            </form>

            <ul>
                ${files.map(file => `<li><a href="/files/${file}">${file}</a></li>`).join('')}
            </ul>
        </body>

        </html>`)
        })
    else
        res.send(`<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>File Server</title>
    </head>

    <body>
        <h1>File Server</h1>

        <p>Welcome!</p>

        <form method="POST" action="/auth">
            <input type="email" name="email">
            <input type="password" name="password">
            <button>Login</button>
        </form>
    </body>

    </html>`)
})

server.post('/auth', (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk)

    req.on('end', () => {
        const email = content.split('&')[0].split('=')[1].replace('%40', '@')
        const password = content.split('&')[1].split('=')[1]

        try {
            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    res.status(400).send(`<h1>${error}</h1>`)

                    return
                }

                context.userId = userId

                res.redirect('/')
            })
        } catch (error) {
            res.status(400).send(`<h1>${error}</h1>`)
        }
    })
})

server.get('/files/:filename', (req, res) => {
    const { filename } = req.params

    const rs = createReadStream(`files/${filename}`)

    rs.pipe(res)
})

server.post('/', (req, res) => {
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

    bb.on('close', () => res.redirect('/'))

    req.pipe(bb)
})

server.listen(8080, () => console.log('server up'))