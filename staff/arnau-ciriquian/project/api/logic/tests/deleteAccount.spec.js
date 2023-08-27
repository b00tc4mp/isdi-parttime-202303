require('./testSetup.js')
const { User } = require('../../data/models')
const deleteAccount = require('../deleteAccount.js')
const { cleanUp, populate, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError } = require('com/errors')

let user

beforeEach(() => {
    user = generate.user()

    return cleanUp()
})

describe('deleteAccount Function', () => {
    it('succeeds on deleting user', async () => {
        const _users = [user]
        const users = await populate(_users)

        const userId = users[0]._id.toString()

        await deleteAccount(userId)

        const user2 = await User.findOne({ email: user.email })

        expect(user2).to.be.null
    })

    it('fails on missing user', async () => {
        const randomId = '123a123b123c'
        try {
            await deleteAccount(randomId)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user not found`)
        }
    })
})