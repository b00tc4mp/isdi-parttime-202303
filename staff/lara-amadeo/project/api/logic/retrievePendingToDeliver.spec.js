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
        const author = await User.create(user)
        const mealDoc = await Meal.create(meal)

        const buyer = await User.create(generateUser())

        chefOrder.meal = mealDoc._id
        chefOrder.author = author._id
        chefOrder.buyer = buyer._id
        const chefOrderDoc = await ChefOrder.create(chefOrder)

        await User.updateOne({ _id: author._id }, { selledMeals: [chefOrderDoc] })

        const retrievedOrders = await retrievePendingToDeliver(author._id)

        expect(retrievedOrders).to.be.an('array')
        expect(retrievedOrders).to.have.lengthOf(1)

        const retrievedOrder = retrievedOrders[0]
        expect(retrievedOrder).to.have.property('serial', '12345')
        expect(retrievedOrder).to.have.property('meals')
        expect(retrievedOrder.meals).to.be.an('array')
        expect(retrievedOrder.meals).to.have.lengthOf(1)
        expect(retrievedOrder).to.have.property('buyer')
        expect(retrievedOrder.buyer._id.toString()).to.equal(buyer._id.toString())
        expect(retrievedOrder).to.have.property('status', 'pending')
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
