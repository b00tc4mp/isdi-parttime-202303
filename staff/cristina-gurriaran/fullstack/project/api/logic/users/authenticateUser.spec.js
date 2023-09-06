require('dotenv').config()
const mongoose = require('mongoose')

const { expect } = require('chai')
const { describe } = require('mocha')
const authenticateUser = require('./authenticateUser') 
const { cleanUp, generateUser } = require('../helpers/tests')
const { errors: { AuthError, ExistenceError, ContentError } } = require('../../../com')
const { User } = require('../../data/models')

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

    it('succeeds on authenticate existing user', async () => {
        user = generateUser()
        await User.create(user)

        const userId = await authenticateUser(user.email, user.password)
        expect(userId).to.exist
        expect(error).to.be.null

        done()

    })

    it('fails on non-existing user', async () => {
        try {
            await authenticateUser('non-existing@user.com', '123123123')
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('user with email ${user.email} not found')
        }
    })

    it('fails on existing user but wrong passord', async () => {
        try {
            await authenticateUser(user.email, 'wrong-password')
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal(`wrong credentials`)
        }
    })

    it('fails on empty email', () =>
        expect(() => authenticateUser('', user.password, () => { })).to.throw(ContentError, 'email is empty')
    )

    it('fails on empty password', () =>
        expect(() => authenticateUser(user.email, '', () => { })).to.throw(RangeError, 'password has less than 8 characters')
    )

    it('fails on non-callback', () =>
        expect(() => authenticateUser(user.email, user.password)).to.throw(Error, 'callback is not a function')
    )
})


