const express = require('express')
const api = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const playgrounds = require('./data/playgrounds')

const retrievePostsHandler = require('./handlers/retrievePlaygroundsHandler')
api.get('/playgrounds', retrievePostsHandler)
