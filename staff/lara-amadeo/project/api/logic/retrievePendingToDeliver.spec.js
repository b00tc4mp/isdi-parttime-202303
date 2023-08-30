const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { retrievePendingToDeliver } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal, ChefOrder } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('retrievePendingToDeliver', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user, meal, chefOrder

    beforeEach(async () => {
        user = generateUser()
        meal = generateMeal()
        chefOrder = {
            meal: null,
            quantity: 2,
            author: null,
            buyer: null,
            status: 'pending',
            serial: '12345'
        }
    })

    after(async () => {
        await cleanUp()
        await mongoose.disconnect()
    })

    it('should retrieve pending orders for a user', async () => {
        let chefOrder2 = {
            meal: null,
            quantity: 3,
            author: null,
            buyer: null,
            status: 'pending',
            serial: '12345'
        }
        const author = await User.create(user)
        const mealDoc = await Meal.create(meal)

        const buyer = await User.create(generateUser())

        chefOrder.meal = mealDoc._id
        chefOrder.author = author._id
        chefOrder.buyer = buyer._id

        chefOrder2.meal = mealDoc._id
        chefOrder2.author = author._id
        chefOrder2.buyer = buyer._id

        const chefOrderDoc = await ChefOrder.create(chefOrder)
        const chefOrderDoc2 = await ChefOrder.create(chefOrder2)

        await User.updateOne({ _id: author._id }, { selledMeals: [chefOrderDoc, chefOrder2] })

        const retrievedOrders = await retrievePendingToDeliver(author._id)

        expect(retrievedOrders).to.be.an('array')
        expect(retrievedOrders).to.have.lengthOf(2)

        //const retrievedOrder = retrievedOrders[0]
        expect(retrievedOrders[0]).to.have.property('serial', '12345')
        expect(retrievedOrders[0]).to.have.property('meals')
        expect(retrievedOrders[0].meals).to.be.an('array')
        expect(retrievedOrders[0].meals).to.have.lengthOf(1)
        expect(retrievedOrders[0]).to.have.property('buyer')
        expect(retrievedOrders[0].buyer._id.toString()).to.equal(buyer._id.toString())
        expect(retrievedOrders[0]).to.have.property('status', 'pending')
    })

    it('should throw an error for a non-existing user', async () => {
        try {
            await retrievePendingToDeliver('64d11134419560441d3b305a')
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include('User with id')
        }
    })
})
