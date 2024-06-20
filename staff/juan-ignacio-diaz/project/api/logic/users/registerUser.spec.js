require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User } = require('../../data/models')

const registerUser = require('./registerUser')

const { generateUser, cleanUp, populateUser } = require('../helpers/tests')

describe('registerUser' , () =>{
    let userTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(() => {
        userTest = generateUser()

        return cleanUp()
    })

    it('succeeds on new user', async () => {
        await registerUser(userTest.name, userTest.email, userTest.password)
        const user = await User.findOne({ email: userTest.email })
        expect(user).to.exist
        expect(user.id).to.be.a('string')
        expect(user.name).to.equal(userTest.name)
        expect(user.email).to.equal(userTest.email)
        expect(user.password).to.equal(userTest.password)
        expect(user.avatar).to.be.null
        expect(user.contacts).to.have.lengthOf(0)
    })

    it('succeeds on other existing user', async () => {
        const userTest2  = generateUser()

        await populateUser(userTest2)
        await registerUser(userTest.name, userTest.email, userTest.password)
        const user_1 = await User.findOne({ email: userTest.email })
        expect(user_1).to.exist
        expect(user_1.id).to.be.a('string')
        expect(user_1.id).to.not.equal(userTest2.id)
        expect(user_1.name).to.equal(userTest.name)
        expect(user_1.email).to.equal(userTest.email)
        expect(user_1.password).to.equal(userTest.password)
        expect(user_1.avatar).to.be.null
        expect(user_1.contacts).to.have.lengthOf(0)
    })

    it('fails on existing user', async () => {
        try {
            await populateUser(userTest)
            return await registerUser(userTest.name, userTest.email, userTest.password)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with email ${userTest.email} already exists`)
        }
    })


    it('fails on empty name', () => {
        expect(() => registerUser('', userTest.email, userTest.password)).to.throw(Error, 'name is empty')
    })

    it('fails on empty email', () =>
        expect(() => registerUser(userTest.name, '', userTest.password)).to.throw(Error, 'email is empty')
    )

    it('fails on non-string name', () => {
        expect(() => registerUser(undefined, userTest.email, userTest.password).to.throw(Error, 'name is not a string'))
        expect(() => registerUser(1, userTest.email, userTest.password).to.throw(Error, 'name is not a string'))
        expect(() => registerUser(true, userTest.email, userTest.password).to.throw(Error, 'name is not a string'))
        expect(() => registerUser({}, userTest.email, userTest.password).to.throw(Error, 'name is not a string'))
        expect(() => registerUser([], userTest.email, userTest.password).to.throw(Error, 'name is not a string'))
    })

    it('fails on non-string email', () => {
        expect(() => registerUser(userTest.name, undefined, userTest.password).to.throw(Error, 'email is not a string'))
        expect(() => registerUser(userTest.name, 1, userTest.password).to.throw(Error, 'email is not a string'))
        expect(() => registerUser(userTest.name, true, userTest.password).to.throw(Error, 'email is not a string'))
        expect(() => registerUser(userTest.name, {}, userTest.password).to.throw(Error, 'email is not a string'))
        expect(() => registerUser(userTest.name, [], userTest.password).to.throw(Error, 'email is not a string'))
    })

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})