require('./testSetup.js')
const { User } = require('../../data/models')
const updateUsername = require('../updateUsername.js')
const { cleanUp, populate, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError, DuplicityError, AuthError, ContentError } = require('com/errors')
const sinon = require("sinon")

let user

beforeEach(() => {
    user = generate.user()

    return cleanUp()
})

afterEach(() => {
    sinon.restore()
})


describe('updateUsename Function', () => {
    it('succeeds on updating username', async () => {
        const _users = [user]
        const newUsername = `newUsername-${Math.random()}`
        
        const users = await populate(_users)
        const userId = users[0]._id.toString()

        await updateUsername(userId, user.name, newUsername, user.password)
        
        const user2 = await User.findOne({ _id: userId })

        expect(user2.name).to.equal(newUsername)
    })

    it('fails on missing user', async () => {
        const newUsername = `newUsername-${Math.random()}`
        const randomId = '123a123b123c'

        try {
            await updateUsername(randomId, user.name, newUsername, user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user not found`)
        }
    })

    it('fails on wrong old username', async () => {
        const _users = [user]
        const newUsername = `newUsername-${Math.random()}`
        const wrongUsername = `wrongUsername-${Math.random()}`

        const users = await populate(_users)
        const userId = users[0]._id.toString()

        try {
            await updateUsername(userId, wrongUsername, newUsername, user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('old username is not correct')
        }
    })

    it('fails on new username being equal to old username', async () => {
        const _users = [user]
        const newUsername = user.name

        const users = await populate(_users)
        const userId = users[0]._id.toString()

        try {
            await updateUsername(userId, user.name, newUsername, user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal('new username is equal to old username')
        }
    })

    it('fails on wrong password', async () => {
        const wrongPassword = `${user.password}1`
        const newUsername = `newUsername-${Math.random()}`

        const _users = [user]
        const users = await populate(_users)
        const userId = users[0]._id.toString()

        try {
            await updateUsername(userId, user.name, newUsername, wrongPassword)
            expect(userId).to.be.undefined
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal(`wrong password`)
        }
    })
})