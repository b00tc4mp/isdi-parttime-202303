require('./testSetup.js')
const { User } = require('../../data/models')
const registerUser = require('../registerUser.js')
const { cleanUp, populateUsers, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { DuplicityError, ContentError } = require('com/errors')
const sinon = require("sinon")

let user

beforeEach(() => {
    user = generate.user()

    return cleanUp()
})

afterEach(() => {
    sinon.restore()
})

describe('registerUser Function', () => {
    it('succeeds on new user', async () => {
        await registerUser(user.name, user.email, user.password)

        const user2 = await User.findOne({ email: user.email })

        expect(user2).to.exist
        expect(user2.name).to.equal(user.name)
        expect(user2.email).to.equal(user.email)
        expect(user2.password).to.equal(user.password)
        expect(user2.character).to.equal('')
    })

    it('succeeds on other existing user', async () => {
        const user2 = generate.user()
        const users = [user2]

        await populateUsers(users)

        await registerUser(user.name, user.email, user.password)

        const user2FromDb = await User.findOne({ email: user.email })

        expect(user2FromDb).to.exist
        expect(user2FromDb.name).to.equal(user.name)
        expect(user2FromDb.email).to.equal(user.email)
        expect(user2FromDb.password).to.equal(user.password)
        expect(user2FromDb.character).to.equal('')
    })

    it('fails on existing user', async () => {
        const users = [user]

        await populateUsers(users)

        try {
            await registerUser(user.name, user.email, user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal(`user with email ${user.email} already exists`)
        }
    })

    it('throws non-DuplicityError on user registration error', async () => {
        const mocking = sinon.stub(User, 'create');
        mocking.throws(new Error('Simulated non-DuplicityError error'));

        expect(() => registerUser(user.name, user.email, user.password))
            .to.throw(Error, 'Simulated non-DuplicityError error')
    })

    it('fails on empty name', async () => {
        expect(() => registerUser('', user.email, user.password))
            .to.throw(Error, 'name is empty')
    })

    it('fails on non-string name', async () => {
        expect(() => registerUser(undefined, user.email, user.password))
            .to.throw(Error, 'name is not a string')

        expect(() => registerUser(1, user.email, user.password))
            .to.throw(Error, 'name is not a string')

        expect(() => registerUser(true, user.email, user.password))
            .to.throw(Error, 'name is not a string')

        expect(() => registerUser({}, user.email, user.password))
            .to.throw(Error, 'name is not a string')

        expect(() => registerUser([], user.email, user.password))
            .to.throw(Error, 'name is not a string')
    })

    it('fails on empty email', async () => {
        expect(() => registerUser(user.name, '', user.password))
            .to.throw(Error, 'email is empty')
    })

    it('fails on non-string email', async () => {
        expect(() => registerUser(user.name, undefined, user.password))
            .to.throw(Error, 'email is not a string')

        expect(() => registerUser(user.name, 1, user.password))
            .to.throw(Error, 'email is not a string')

        expect(() => registerUser(user.name, true, user.password))
            .to.throw(Error, 'email is not a string')

        expect(() => registerUser(user.name, {}, user.password))
            .to.throw(Error, 'email is not a string')

        expect(() => registerUser(user.name, [], user.password))
            .to.throw(Error, 'email is not a string')
    })

    it('fails on empty password', async () => {
        expect(() => registerUser(user.name, user.email, ''))
            .to.throw(Error, 'password is empty')
    })

    it('fails on non-string password', async () => {
        expect(() => registerUser(user.name, user.email, undefined,))
            .to.throw(Error, 'password is not a string')

        expect(() => registerUser(user.name, user.email, 1,))
            .to.throw(Error, 'password is not a string')

        expect(() => registerUser(user.name, user.email, true,))
            .to.throw(Error, 'password is not a string')

        expect(() => registerUser(user.name, user.email, {},))
            .to.throw(Error, 'password is not a string')

        expect(() => registerUser(user.name, user.email, [],))
            .to.throw(Error, 'password is not a string')
    })

    it('fails on password shorter than 4 character', async () => {
        expect(() => registerUser(user.name, user.email, 'Aa1'))
            .to.throw(RangeError, 'password is shorter than 4 characters')
    })

    it('fails on password not containing a lowercase', async () => {
        expect(() => registerUser(user.name, user.email, 'TEST1'))
            .to.throw(ContentError, 'password does not include a lowercase')
    })

    it('fails on password not containing an uppercase', async () => {
        expect(() => registerUser(user.name, user.email, 'test1'))
            .to.throw(ContentError, 'password does not include an uppercase')
    })

    it('fails on password not containing a number', async () => {
        expect(() => registerUser(user.name, user.email, 'Test'))
            .to.throw(ContentError, 'password does not include a number')
    })

    it('fails on password containing a blank space', async () => {
        expect(() => registerUser(user.name, user.email, 'Test 1'))
            .to.throw(ContentError, 'password includes a blank space')
    })
})