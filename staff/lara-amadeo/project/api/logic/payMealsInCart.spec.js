const dotenv = require('dotenv')
dotenv.config()
const { expect } = require('chai')
const { describe } = require('mocha')
const mongoose = require('mongoose')

const { payMealsInCart } = require('../logic')
const { cleanUp, generateUser, generateMeal } = require('../helpers/tests')

const { User, Meal } = require('../data/models')

const { errors: { AuthError, ExistanceError } } = require('../../com')

describe('payMealsinCart function', () => {
    before(async () => {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
    })

    beforeEach(async () => {
        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should successfully pay for meals in the user cart', async () => {
        const chef = await User.create(generateUser())
        const user = await User.create(generateUser())

        const meal1 = await Meal.create(generateMeal())
        await Meal.updateOne({ _id: meal1._id }, { author: chef._id })
        const meal2 = await Meal.create(generateMeal())
        await Meal.updateOne({ _id: meal2._id }, { author: chef._id })

        user.cart.push({ meal: meal1._id, author: meal1.author, quantity: 3 })
        user.cart.push({ meal: meal2._id, author: meal2.author, quantity: 5 })

        await user.save()

        await payMealsInCart(user._id.toString())

        const updatedUser = await User.findById(user._id)
        expect(updatedUser.cart).to.have.lengthOf(0)


        const order = updatedUser.order[0]
        expect(order.items).to.have.lengthOf(2)
    })

    it('should throw an error for a non-existing user', async () => {
        const nonExistingUserId = new mongoose.Types.ObjectId()

        try {
            await payMealsInCart(nonExistingUserId.toString())
        } catch (error) {
            expect(error).to.be.instanceOf(ExistanceError)
            expect(error.message).to.include(`User with id ${nonExistingUserId}`)
        }
    })
})