const express = require('express')
const { createWriteStream, readdir, createReadStream } = require('fs')
const busboy = require('busboy')
const { createNewToken } = require('./utils')

const server = express()

// page rendering
server.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>RPG File Server</title>
        </head>
        <body style="background-color: grey;">
            <h1>RPG File Server</h1>
            <p>Upload a new character!</p>
            <form method="POST" action="/" enctype="multipart/form-data">
                <input type="file" name="file">
                <button>Upload</button>
            </form>
            
            <a href="/files">Go to characters</a>
        </body>
        </html>`)
})

//
let chosenRace = 'all'
let chosenClass = 'sorcerer'
//

//server.get('/files', (req, res) => {
server.get('/files', (req, res) => {
    readdir('files', (error, files) => {
        if (error) {
            res.status(500).send(`<h1>${error}</h1>`);
            return;
        }

        let chosenRace = 'all'; // Initialize chosenRace variable
        let chosenClass = 'all'; // Initialize chosenClass variable

        if (req.query.race) {
            chosenRace = req.query.race;
        }

        if (req.query.class) {
            chosenClass = req.query.class;
        }

        let fileListHTML = files.map(file => {
                if (chosenClass === 'all' || 
                    chosenClass === file.split('-')[2]) {
                    if (chosenRace === 'all' || 
                        chosenRace === file.split('-')[1]) {
                        return `<li><a href="/files/${file}"><img src="/files/${file}" width="200" height="270" ></a></li>`;
                    }
                }
            }).join('');

        res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>RPG File Server</title>
            </head>
            <body style="background-color: grey;">
                <h1>RPG File Server</h1>
                <a href="/">Upload a new character</a>
                <p>Characters</p>
                <label for="race-select">Choose a race:</label>
                    <select name="races" id="race-select">
                        <option value="all">all</option>
                        <option value="human">human</option>
                        <option value="elf">elf</option>
                        <option value="halfling">halfling</option>
                        <option value="halforc">halforc</option>
                        <option value="thiefling">thiefling</option>
                        <option value="dwarf">dwarf</option>
                    </select>
                <label for="class-select">Choose a class:</label>
                    <select name="classes" id="class-select">
                        <option value="all">all</option>
                        <option value="warrior">warrior</option>
                        <option value="barbarian">barbarian</option>
                        <option value="bard">bard</option>
                        <option value="sorcerer">sorcerer</option>
                        <option value="ranger">ranger</option>
                        <option value="hunter">hunter</option>
                        <option value="necromancer">necromancer</option>
                    </select>
                <ul type="none" id="files-list">${fileListHTML}</ul>
                <script>
                    const selectedRace = document.getElementById("race-select");
                    const selectedClass = document.getElementById("class-select");
                    const filesList = document.getElementById("files-list");

                    const files = ${JSON.stringify(files)};

                    selectedRace.addEventListener("change", () => {
                        chosenRace = selectedRace.value;
                        chosenClass = selectedClass.value;
                        updateFilesList();
                    });

                    selectedClass.addEventListener("change", () => {
                        chosenClass = selectedClass.value;
                        chosenRace = selectedRace.value;
                        updateFilesList();
                    });

                    function updateFilesList() {
                        filesList.innerHTML = "";
                        files.map(file => {
                                if (chosenClass === 'all' || chosenClass === file.split('-')[2] ) { if ( chosenRace === 'all' || chosenRace === file.split('-')[1] ) {
                                        filesList.innerHTML += '<li><a href="/files/' + file + '"><img src="/files/' + file + '" width="200" height="270" ></a></li>';
                                    }
                                }
                            })
                    }
                </script>
                </body>
            </html>`)
    })
})



// user authentication -> server.post('/auth', ....)

// file visualization v1 -> single file in a new page
server.get('/files/:filename', (req, res) => {
    const { filename } = req.params

    const rs = createReadStream(`files/${filename}`)

    rs.pipe(res)

})

// file upload
server.post('/', (req, res) => {
    const bb = busboy({ headers: req.headers })

    bb.on('file', (name, file, info) => {
        let { filename, encoding, mimeType } = info

        const token = createNewToken(5)

        filename = `${token}-${filename}`

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