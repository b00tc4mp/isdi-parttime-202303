require('./testSetup.js')
const { User } = require('../../data/models')
const updateUserEmail = require('../updateUserEmail.js')
const { cleanUp, populate, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError, DuplicityError, AuthError } = require('com/errors')

let user

beforeEach(() => {
    user = generate.user()

    return cleanUp()
})

describe('updateUserEmail Function', () => {
    it('succeeds on updating user email', async () => {
        const _users = [user]
        const newEmail = `newEmail-${Math.random()}@test.com`
        
        const users = await populate(_users)
        const userId = users[0]._id.toString()

        await updateUserEmail(userId, user.email, newEmail, user.password)
        
        const user2 = await User.findOne({ _id: userId })

        expect(user2.email).to.equal(newEmail)
    })

    it('fails on missing user', async () => {
        const newEmail = `newEmail-${Math.random()}@test.com`
        const randomId = '123a123b123c'
        try {
            await updateUserEmail(randomId, user.email, newEmail, user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user not found`)
        }
    })

    it('fails on wrong old email', async () => {
        const _users = [user]
        const newEmail = `newEmail-${Math.random()}@test.com`
        const wrongEmail = `wrongEmail-${Math.random()}@test.com`

        const users = await populate(_users)
        const userId = users[0]._id.toString()

        try {
            await updateUserEmail(userId, wrongEmail, newEmail, user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal('email does not correspond to actual email')
        }
    })

    it('fails on new email being equal to old email', async () => {
        const _users = [user]
        const newEmail = user.email

        const users = await populate(_users)
        const userId = users[0]._id.toString()

        try {
            await updateUserEmail(userId, user.email, newEmail, user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal('new email already registered')
        }
    })

    it('fails on wrong password', async () => {
        const wrongPassword = `${user.password}1`
        const newEmail = `newEmail-${Math.random()}@test.com`

        const _users = [user]
        const users = await populate(_users)
        const userId = users[0]._id.toString()

        try {
            await updateUserEmail(userId, user.email, newEmail, wrongPassword)
            expect(userId).to.be.undefined
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal(`wrong password`)
        }
    })
})