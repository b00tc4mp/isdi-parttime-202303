const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { retrieveMeal } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('retrieveMeal', () => {
    before(async () => {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
    })

    let user

    beforeEach(async () => {
        user = generateUser()
        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should retrieve a meal for a valid meal ID', async () => {
        const author = await User.create(user)
        const mealData = generateMeal()
        mealData.author = author._id
        const meal = await Meal.create(mealData)

        const retrievedMeal = await retrieveMeal(meal._id.toString())

        expect(retrievedMeal.author).to.be.an('object')


        expect(retrievedMeal).to.be.an('object')
        expect(retrievedMeal.title).to.equal(mealData.title)
        expect(retrievedMeal.images).to.deep.equal(mealData.images)
        expect(retrievedMeal.description).to.equal(mealData.description)
        expect(retrievedMeal.categories).to.deep.equal(mealData.categories)
        expect(retrievedMeal.ingredients).to.deep.equal(mealData.ingredients)
        expect(retrievedMeal.quantity).to.equal(mealData.quantity.toString())
        expect(retrievedMeal.bestBefore).to.equal(mealData.bestBefore.toString())
        expect(retrievedMeal.price).to.equal(mealData.price.toString())
        //expect(new Date(retrievedMeal.date)).to.equal(new Date(mealData.date))

        //author object
        expect(retrievedMeal.author).to.be.an('object')
        expect(retrievedMeal.author.id).to.equal(author._id.toString())
        expect(retrievedMeal.author.username).to.equal(author.username)
        expect(retrievedMeal.author.name).to.equal(author.name)
        expect(retrievedMeal.author.description).to.equal(author.description)
        expect(retrievedMeal.author.tags).to.deep.equal(author.tags)
        expect(retrievedMeal.author.avatar).to.equal(author.avatar)
        expect(retrievedMeal.author.availability).to.deep.equal(author.availability)
        expect(retrievedMeal.author.location).to.equal(author.location)
        expect(retrievedMeal.author.reviews).to.deep.equal(author.reviews)

    })
})