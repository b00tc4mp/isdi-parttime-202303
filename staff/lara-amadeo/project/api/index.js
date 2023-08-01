require('dotenv').config()

const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const { helloAPIHandler, registerUserHandler, authenticateUserHandler, registerAdditionalInfoHandler, createMealHandler, retrieveMealsHandler, retrieveUserHandler, retrieveMealHandler, retrieveOwnMealsHandler, updateMealHandler } = require('./handlers')

const mongoose = require('mongoose')

const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/6zeyr5rgu/yuperApp/',
    publicKey: 'public_9DujXADbFrwoOkNd+rUmvTbT/+U=',
    privateKey: 'private_Ohzt9aum24ztTasqw/eWNiggN+4='
})

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

        //retrieveMeal
        api.get('/meal/:mealId', retrieveMealHandler)

        //retrieveOwnMeals
        api.get('/meals/user/', retrieveOwnMealsHandler)

        //updateMeal
        api.post('/meals/update/:mealId', jsonBodyParser, updateMealHandler)


        api.get('/IKAuth', (req, res) => {
            const result = imagekit.getAuthenticationParameters()
            res.send(result)
        })

        api.listen(1234, () => console.log('server up'))
    })
    .catch(error => {
        console.log(error)
    })
