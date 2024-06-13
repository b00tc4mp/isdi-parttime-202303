require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('../registerUser')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ContentError, DuplicityError } } = require('com')
const { User } = require('../../data/models')
const bcrypt = require('bcryptjs')

describe('registerUser', () => {
    let user, name, email, password, avatar, favs

    before(async () => await mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        try {
            await cleanUp()

            user = generate.user()
            name = user.name
            email = user.email
            password = user.password
            avatar = user.avatar
            favs = user.favs

        } catch (error) {
            
        }

    })

    it('succeeds on registering user', async () => {
        try {
            await registerUser(name, email, password)

            const _user = await User.findOne({ email: email })

            expect(_user).to.be.a('object')
            expect(_user.name).to.equal(name)
            expect(_user.email).to.equal(email)
            expect(_user.avatar).to.be.null
            expect(_user.favs).to.be.an('array')

            const match = await bcrypt.compare(password, _user.password)

            expect(match).to.be.true
            

        } catch (error) {
            
        }
    })
    
    it('fails on existing user', async () => {
        try {
            User.create({ name, email, password })

            await registerUser(name, email, password)

        } catch (error) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal(`User with email ${email} already exists.`)
        }
    })

    it('fails on email not valid', async () => {
        try {
            const wrongEmail = 'testEmail.com'
            await registerUser(name, wrongEmail, password)

        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal(`The email is not valid.`)
        }
    })

    it('fails on empty name', () => expect(() => registerUser('', email, password)).to.throw(ContentError, 'The name field is empty.'))

    it('fails on a non-string name', () => {
        expect(() => registerUser(true, email, password)).to.throw(TypeError, 'The name is not a string.')
        expect(() => registerUser([], email, password)).to.throw(TypeError, 'The name is not a string.')
        expect(() => registerUser({}, email, password)).to.throw(TypeError, 'The name is not a string.')
        expect(() => registerUser(undefined, email, password)).to.throw(TypeError, 'The name is not a string.')
        expect(() => registerUser(1, email, password)).to.throw(TypeError, 'The name is not a string.')
    })

    it('fails on empty email', () => expect(() => registerUser(name, '', password)).to.throw(ContentError, 'The email field is empty.'))

    it('fails on a non-string email', () => {
        expect(() => registerUser(name, true, password)).to.throw(TypeError, 'The email is not a string.')
        expect(() => registerUser(name, [], password)).to.throw(TypeError, 'The email is not a string.')
        expect(() => registerUser(name, {}, password)).to.throw(TypeError, 'The email is not a string.')
        expect(() => registerUser(name, undefined, password)).to.throw(TypeError, 'The email is not a string.')
        expect(() => registerUser(name, 1, password)).to.throw(TypeError, 'The email is not a string.')
    })

    it('fails on empty password', () => expect(() => registerUser(name, email, '123')).to.throw(RangeError, 'The password is lower than 6 characters.'))

    it('fails on a non-string password', () => {
        expect(() => registerUser(name, email, true)).to.throw(TypeError, 'The password is not a string.')
        expect(() => registerUser(name, email, [])).to.throw(TypeError, 'The password is not a string.')
        expect(() => registerUser(name, email, {})).to.throw(TypeError, 'The password is not a string.')
        expect(() => registerUser(name, email, undefined)).to.throw(TypeError, 'The password is not a string.')
        expect(() => registerUser(name, email, 1)).to.throw(TypeError, 'The password is not a string.')
    })

    after(async () => await mongoose.disconnect())
})