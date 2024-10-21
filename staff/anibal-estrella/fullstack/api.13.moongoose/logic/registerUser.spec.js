require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('./registerUser')
const { cleanUp, populate, generate } = require('./helpers/tests')
const { MongoClient } = require('mongodb')
const context = require('./context')

describe('registerUser', () => {
    let client

    before(() => {
        client = new MongoClient(process.env.MONGODB_URL)

        return client.connect()
            .then(connection => {
                const db = connection.db()

                context.users = db.collection('users')
                context.posts = db.collection('posts')
            })
    })

    let user

    beforeEach(() => {
        user = generate.user()

        return cleanUp()
    })


    it('SUCCEEDS when new user is registered', () =>
        registerUser(user.name, user.email, user.password, user.password)
            .then(() => context.users.findOne({ email: user.email }))
            .then(user2 => {
                expect(user2).to.exist
                // expect(user2._id.toString()).to.equal(user._id.toString())
                expect(user2.name).to.be.equal(user.name)
                expect(user2.email).to.be.equal(user.email)
                expect(user2.password).to.be.equal(user.password)
                expect(user2.avatar).to.be.null
                expect(user2.favs).to.have.lengthOf(0)
            })
    )

    it('SUCCEEDS on other existing user', () => {
        const user2 = generate.user()
        const users = [user2]

        return populate(users, [])
            .then(() => registerUser(user.name, user.email, user.password, user.password))
            .then(() => context.users.findOne({ email: user.email }))
            .then(user2 => {
                expect(user2).to.exist
                expect(user2.name).to.equal(user.name)
                expect(user2.email).to.equal(user.email)
                expect(user2.password).to.equal(user.password)
                expect(user2.avatar).to.be.null
                expect(user2.favs).to.have.lengthOf(0)
            })
    })

    it('FAILS existing user', () => {
        const users = [user]

        return populate(users, [])
            .then(() => registerUser(user.name, user.email, user.password, user.password))
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${user.email} already exists`)
            })
    })

    it('FAILS on empty name', () => {
        expect(() => registerUser('', user.email, user.password, () => { })).to.throw(Error, 'name is blank')
    })

    it('FAILS on empty email', () => {
        expect(() => registerUser(user.name, '', user.password, () => { })).to.throw(Error, `email is blank`)
    })

    it('FAILS on not an email', () => {
        expect(() => registerUser(user.name, user.email[0], user.password, () => { })).to.throw(Error, `email is not an email`)
    })

    it('FAILS on non-string name', () => {
        expect(() => registerUser(undefined, user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser(1, user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser(null, user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser(true, user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser(false, user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser({}, user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
        expect(() => registerUser([], user.email, user.password, () => { })).to.throw(Error, `name must be a string`)
    })

    it('FAILS on non-string email', () => {
        expect(() => registerUser(user.name, undefined, user.password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(user.name, 1, user.password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(user.name, null, user.password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(user.name, true, user.password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(user.name, false, user.password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(user.name, {}, user.password, () => { })).to.throw(Error, `email must be a string`)
        expect(() => registerUser(user.name, [], user.password, () => { })).to.throw(Error, `email must be a string`)
    })
    after(() => cleanUp().then(() => client.close()))
})
