const { User } = require('../../data/models')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const registerUser = require('../registerUser.js')
const { cleanUp, populate, generate } = require('../helpers-tests')
const { expect, assert } = require('chai')
const { DuplicityError } = require('com/errors')
const sinon = require("sinon");

let mongoServer

before(async () => {
    mongoServer = await MongoMemoryServer.create()
    const mongoUri = mongoServer.getUri()

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
})

let user

beforeEach(() => {
    user = generate.user()

    return cleanUp()
})

afterEach(() => {
    sinon.restore()
})

after(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
})

describe('registerUser Function', () => {
    it('succeeds on new user', async () => {
        await registerUser(user.name, user.email, user.password)

        const user2 = await User.findOne({ email: user.email })

        expect(user2).to.exist
        expect(user2.name).to.equal(user.name)
        expect(user2.email).to.equal(user.email)
        expect(user2.password).to.equal(user.password)
        expect(user2.character).to.be.null
    })

    it('succeeds on other existing user', async () => {
        const user2 = generate.user()
        const users = [user2]

        await populate(users)

        await registerUser(user.name, user.email, user.password)

        const user2FromDb = await User.findOne({ email: user.email })

        expect(user2FromDb).to.exist
        expect(user2FromDb.name).to.equal(user.name)
        expect(user2FromDb.email).to.equal(user.email)
        expect(user2FromDb.password).to.equal(user.password)
        expect(user2FromDb.character).to.be.null
    })

    it('fails on existing user', async () => {
        const users = [user]

        await populate(users)

        try {
            await registerUser(user.name, user.email, user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal(`user with email ${user.email} already exists`)
        }
    })

    it('throws non-DuplicityError on user registration error', async () => {
        const mockCreate = sinon.stub(User, 'create');
        mockCreate.throws(new Error('Simulated UnknowError error'));
        
        try {
            await registerUser(user.name, user.email, user.password)

            expect.fail('Expected an error to be thrown')
        } catch (error) {
            expect(error).to.not.be.instanceOf(DuplicityError)
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.include('Simulated UnknowError error')
        }
    })

    it('fails on empty name', async () => {
        try {
            await registerUser('', user.email, user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`name is empty`)
        }
    })

    it('fails on non-string name', async () => {
        try {
            await registerUser(undefined, user.email, user.password, () => { })
            throw new Error('Test did not throw as expected')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('name is not a string')
        }

        try {
            await registerUser(1, user.email, user.password, () => { })
            throw new Error('Test did not throw as expected')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('name is not a string')
        }

        try {
            await registerUser(true, user.email, user.password, () => { })
            throw new Error('Test did not throw as expected')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('name is not a string')
        }

        try {
            await registerUser({}, user.email, user.password, () => { })
            throw new Error('Test did not throw as expected')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('name is not a string')
        }

        try {
            await registerUser([], user.email, user.password, () => { })
            throw new Error('Test did not throw as expected')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('name is not a string')
        }
    })

    it('fails on empty email', async () => {
        try {
            await registerUser(user.name, '', user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`email is empty`)
        }
    })

    it('fails on non-string email', async () => {
        try {
            await registerUser(user.name, undefined, user.password, () => { })
            throw new Error('Test did not throw as expected')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('email is not a string')
        }

        try {
            await registerUser(user.name, 1, user.password, () => { })
            throw new Error('Test did not throw as expected')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('email is not a string')
        }

        try {
            await registerUser(user.name, true, user.password, () => { })
            throw new Error('Test did not throw as expected')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('email is not a string')
        }

        try {
            await registerUser(user.name, {}, user.password, () => { })
            throw new Error('Test did not throw as expected')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('email is not a string')
        }

        try {
            await registerUser(user.name, [], user.password, () => { })
            throw new Error('Test did not throw as expected')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('email is not a string')
        }
    })
})