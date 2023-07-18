require('dotenv').config()

const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const { helloAPIHandler, registerUserHandler, authenticateUserHandler, registerAdditionalInfoHandler, createMealHandler, retrieveMealsHandler, retrieveUserHandler, retrieveMealHandler } = require('./handlers')

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.get('/helloAPI', helloAPIHandler)

        //register user
        api.post('/users', jsonBodyParser, registerUserHandler)

        //complete info user
        api.post('/users/info', jsonBodyParser, registerAdditionalInfoHandler)

        //authenticate user
        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        //retrieveUser
        api.get('/users', retrieveUserHandler)

        //createMeal
        api.post('/meals', jsonBodyParser, createMealHandler)

        //retrieveMeals
        api.get('/meals', retrieveMealsHandler)

        //retrieveMeals
        api.get('/meal/:mealId', retrieveMealHandler)


        api.listen(1234, () => console.log('server up'))
    })
    .catch(error => {
        console.log(error)
    })
