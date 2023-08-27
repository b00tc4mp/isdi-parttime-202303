require('./testSetup.js')
const getLoggedUser = require('../getLoggedUser.js')
const { cleanUp, populate, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError } = require('com/errors')
const sinon = require("sinon")

let user

beforeEach(() => {
    user = generate.user()

    return cleanUp()
})

afterEach(() => {
    sinon.restore()
})

describe('getLoggedUser Function', () => {
    it('succeeds on retrieving logged user info, without character', async () => {
        const _users = [user]
        const users = await populate(_users)

        const userId = users[0]._id.toString()

        const retrievedUser = await getLoggedUser(userId)

        expect(retrievedUser).to.exist
        expect(retrievedUser.name).to.equal(user.name)
        expect(retrievedUser.email).to.equal(user.email)
        expect(retrievedUser._id).to.be.undefined
        expect(retrievedUser.password).to.be.undefined
        expect(retrievedUser.character).to.be.undefined
    })

    it('succeeds on retrieving logged user info, with character', async () => {
        user.character = `character-${Math.random()}`
        const _users = [user]
        const users = await populate(_users)

        const userId = users[0]._id.toString()

        const retrievedUser = await getLoggedUser(userId)

        expect(retrievedUser).to.exist
        expect(retrievedUser.name).to.equal(user.name)
        expect(retrievedUser.email).to.equal(user.email)
        expect(retrievedUser._id).to.be.undefined
        expect(retrievedUser.password).to.be.undefined
        expect(retrievedUser.character).to.equal(user.character)
    })

    it('fails on missing user', async () => {
        const randomId = '123a123b123c'
        try {
            await getLoggedUser(randomId)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user not found`)
        }
    })
})