require('dotenv').config()
const mongoose = require('mongoose')

const sinon = require('sinon');
const { expect } = require('chai')
const { describe } = require('mocha')
const { cleanUp, generateUser } = require('../helpers/tests')
const { errors: { ContentError, DuplicityError, UnknownError } } = require('com')
const { User } = require('../../data/models')
const registerUser = require('./registerUser')

describe('registerUser', () => {
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

    it('should succed on new registered user', async () => {
        user = generateUser()
        await registerUser(user.name, user.email, user.password)

        const registeredUser = await User.findOne({ email: user.email })

        expect(registeredUser).to.exist
        expect(registeredUser.name).to.equal(user.name)
        expect(registeredUser.email).to.equal(user.email)
        expect(registeredUser.password).to.equal(user.password)
        expect(registeredUser.password).to.be.a('string')
        expect(registeredUser.avatar).to.be.null
        expect(registeredUser.favs).to.have.lengthOf(0)
  
    })

    it('should succeed when another user is already registered', async () => {
        const otherUser = generateUser()
        await User.create(otherUser)
        user = generateUser()

        await registerUser(user.name, user.email, user.password)
        const registeredUser = await User.findOne({ email: user.email })

        expect(registeredUser).to.exist
        expect(registeredUser.name).to.equal(user.name)
        expect(registeredUser.email).to.equal(user.email)
        expect(registeredUser.password).to.equal(user.password)
        expect(registeredUser.avatar).to.be.null
        expect(registeredUser.favs).to.have.lengthOf(0)
    })

    it('should throw DuplicityError on existing user', async () => {
        const user = generateUser()
        const existingUser = generateUser()
        await User.create(existingUser)

        try {
            await registerUser(user.name, existingUser.email, user.password)

        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal(`user already exists`)
       }
    })

    it('should throw UnknownError on user failed registration', async () => {
        const user = generateUser();

        const createUserStub = sinon.stub(User, 'create');
        createUserStub.throws(new Error('Simulated unknown error'));

        try {
            await registerUser(user.name, user.email, user.password);
        } catch (error) {
            expect(error).to.be.instanceOf(UnknownError);
            expect(error.message).to.equal('unknown');
        } finally {
            createUserStub.restore();
        }
    });


    it('should fail on empty name', () => {
        user = generateUser()
        expect(() => registerUser('', user.email, user.password)).to.throw(ContentError, 'name is empty')
    })

    it('should fail on empty email', () => {
        user = generateUser()
        expect(() => registerUser(user.name, '', user.password)).to.throw(ContentError, 'email is empty')
    })

    it('should fail on non-string name', () => {
        user = generateUser()
        expect(() => registerUser(undefined, user.email, user.password)).to.throw(TypeError, 'name is not a string')
        expect(() => registerUser(1, user.email, user.password)).to.throw(TypeError, 'name is not a string')
        expect(() => registerUser(true, user.email, user.password)).to.throw(TypeError, 'name is not a string')
        expect(() => registerUser({}, user.email, user.password)).to.throw(TypeError, 'name is not a string')
        expect(() => registerUser([], user.email, user.password)).to.throw(TypeError, 'name is not a string')
    })

    it('should fail on non-string email', () => {
        user = generateUser()
        expect(() => registerUser(user.name, undefined, user.password)).to.throw(TypeError, 'email is not a string')
        expect(() => registerUser(user.name, 1, user.password)).to.throw(TypeError, 'email is not a string')
        expect(() => registerUser(user.name, true, user.password)).to.throw(TypeError, 'email is not a string')
        expect(() => registerUser(user.name, {}, user.password)).to.throw(TypeError, 'email is not a string')
        expect(() => registerUser(user.name, [], user.password)).to.throw(TypeError, 'email is not a string')
    })

    it('should fail on empty password', () => {
        user = generateUser()
        expect(() => registerUser(user.name, user.email, '')).to.throw(RangeError, 'password has less than 8 characters')
    })

    it('should fail on password shorter than 8 characters', () => {
        user = generateUser()
        expect(() => registerUser(user.name, user.email, '123')).to.throw(RangeError, 'password has less than 8 characters')
    })

    it('should fail on non-string password', () => {
        user = generateUser()
        expect(() => registerUser(user.name, user.email, 1)).to.throw(TypeError, 'password is not a string')
        expect(() => registerUser(user.name, user.email, undefined)).to.throw(TypeError, 'password is not a string')
        expect(() => registerUser(user.name, user.email, true)).to.throw(TypeError, 'password is not a string')
        expect(() => registerUser(user.name, user.email, [])).to.throw(TypeError, 'password is not a string')
        expect(() => registerUser(user.name, user.email, {})).to.throw(TypeError, 'password is not a string')
    })

})


