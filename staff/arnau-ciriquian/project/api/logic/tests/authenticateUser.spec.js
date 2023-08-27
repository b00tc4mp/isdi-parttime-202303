require('./testSetup.js')
const authenticateUser = require('../authenticateUser.js')
const { cleanUp, populate, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError, AuthError } = require('com/errors')
const sinon = require("sinon")

let user

beforeEach(() => {
    user = generate.user()

    return cleanUp()
})

afterEach(() => {
    sinon.restore()
})

describe('authenticateUser Function', () => {
    it('succeeds on authenticating user', async () => {
        const _users = [user]
        const users = await populate(_users)

        const userId = await authenticateUser(user.email, user.password)

        expect(userId).to.equal(users[0]._id.toString())
    })

    it('fails on missing user', async () => {
        try {
            const userId = await authenticateUser(user.email, user.password)
            expect(userId).to.be.undefined
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user not found`)
        }
    })

    it('fails on wrong password', async () => {
        const wrongPassword = `${user.password}1`

        const users = [user]
        await populate(users)

        try {
            const userId = await authenticateUser(user.email, wrongPassword)
            expect(userId).to.be.undefined
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal(`wrong password`)
        }
    })
})