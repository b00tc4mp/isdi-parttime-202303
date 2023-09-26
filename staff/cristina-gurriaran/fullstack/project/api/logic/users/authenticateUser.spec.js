require('dotenv').config()
const mongoose = require('mongoose')

const { expect } = require('chai')
const { describe } = require('mocha')
const { cleanUp, generateUser } = require('../helpers/tests')
const { errors: { AuthError, ExistenceError } } = require('com')
const { User } = require('../../data/models')
const authenticateUser = require('./authenticateUser')

describe('authenticateUser', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user

    beforeEach(async () => {
        user = generateUser()
        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should succed on authenticate existing user', async () => {
        user = generateUser()
        await User.create(user)

        const authenticatedUser = await authenticateUser(user.email, user.password)
        expect(authenticatedUser).to.exist
    })

    it('should fail on non-existing user', async () => {
        user = generateUser()
        try {
            await authenticateUser(user.email, user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('user not found')
        }
    })

    it('should fail  on existing user but wrong password', async () => {
        user = generateUser()
        await User.create(user)
        try {
            await authenticateUser(user.email, 'wrong-password')
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal('wrong credentials')
        }
    })

    it('should fail on empty email', () =>{
        user = generateUser()
        expect(() => authenticateUser('', user.password)).to.throw(Error, 'email is empty')
    })

    it('should fail on non-string email', () => {
        user = generateUser()
        expect(() => authenticateUser(1, user.password)).to.throw(TypeError, 'email is not a string')
        expect(() => authenticateUser(true, user.password)).to.throw(TypeError, 'email is not a string')
        expect(() => authenticateUser({}, user.password)).to.throw(TypeError, 'email is not a string')
        expect(() => authenticateUser([], user.password)).to.throw(TypeError, 'email is not a string')
    })

    it('should fail on empty password', () =>{
        user = generateUser()
        expect(() => authenticateUser(user.email, '')).to.throw(RangeError, 'password has less than 8 characters')
    })

    it('should fail on password shorter than 8 characters', () => {
        user = generateUser()
        expect(() => authenticateUser(user.email, '123')).to.throw(RangeError, 'password has less than 8 characters')
    })

    it('should fail on non-string password', () => {
        user = generateUser()
        expect(() => authenticateUser(user.email, 123)).to.throw(TypeError, 'password is not a string')
        expect(() => authenticateUser(user.email, undefined)).to.throw(TypeError, 'password is not a string')
        expect(() => authenticateUser(user.email, true)).to.throw(TypeError, 'password is not a string')
        expect(() => authenticateUser(user.email, [])).to.throw(TypeError, 'password is not a string')
        expect(() => authenticateUser(user.email, {})).to.throw(TypeError, 'password is not a string')
    })
})


