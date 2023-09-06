require('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('../authenticateUser')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError, AuthError } } = require('com')
const { User } = require('../../data/models')
const bcrypt = require('bcryptjs')

describe('authenticateUser', () => {
    let user, email, password

    before(async () => await mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        try {
            await cleanUp()

            user = generate.user()
            email = user.email
            password = user.password

            user.password = await bcrypt.hash(password, 10)

            await populate(user, [])
        } catch (error) {
            
        }
    })

    it('succeeds on existing user', async () => {
        try {
            const userId = await authenticateUser(email, password)

            const _user = await User.findById(userId)

            expect(userId).to.be.a('string')
            expect(userId).to.equal(_user.id)

        } catch (error) {
            
        }
    })



    it('fails on non-existing user', async () => {
        try {
            const newEmail = email + 'wrong'
            await authenticateUser(newEmail, password)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`User not found.`)
        }
    })

    it('fails on existing user but wrong password', async () => {
        try {
            const newPassword = await bcrypt.hash(password + 'wrong', 10)
            await authenticateUser(email, newPassword)

        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal('Wrong credentials.')
        }
    })

    it('fails on empty email', () => expect(() => authenticateUser('', password)).to.throw(ContentError, 'The email field is empty.'))

    it('fails on a non-string email', () => {
        expect(() => authenticateUser(true, password)).to.throw(TypeError, 'The email is not a string.')
        expect(() => authenticateUser([], password)).to.throw(TypeError, 'The email is not a string.')
        expect(() => authenticateUser({}, password)).to.throw(TypeError, 'The email is not a string.')
        expect(() => authenticateUser(undefined, password)).to.throw(TypeError, 'The email is not a string.')
        expect(() => authenticateUser(1, password)).to.throw(TypeError, 'The email is not a string.')
    })

    it('fails on empty password', () => expect(() => authenticateUser(email, '123')).to.throw(RangeError, 'The password is lower than 6 characters.'))

    it('fails on a non-string password', () => {
        expect(() => authenticateUser(email, true)).to.throw(TypeError, 'The password is not a string.')
        expect(() => authenticateUser(email, [])).to.throw(TypeError, 'The password is not a string.')
        expect(() => authenticateUser(email, {})).to.throw(TypeError, 'The password is not a string.')
        expect(() => authenticateUser(email, undefined)).to.throw(TypeError, 'The password is not a string.')
        expect(() => authenticateUser(email, 1)).to.throw(TypeError, 'The password is not a string.')
    })

    after(async () => await mongoose.disconnect())
})