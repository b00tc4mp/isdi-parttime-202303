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
                context.events = db.collection('events')
                context.eventReview = db.collection('eventReviews')
                context.place = db.collection('places')
            })
    })

    let user

    beforeEach(() => {
        user = generate.user()

        return cleanUp()
    })

    it('succeeds on new user', () =>
        registerUser(user.name, user.email, user.password, user.nickName, user.ipGeoLocation, user.city, user.avatar, user.favArtists)
            .then(() => context.users.findOne({ email: user.email, ipGeoLocation: user.ipGeoLocation, city: user.city, avatar: user.avatar, favArtists: user.favArtists, }))
            .then(user2 => {
                expect(user2).to.exist
                // expect(user2._id.toString()).to.equal(user._id.toString())
                expect(user2.name).to.equal(user.name)
                expect(user2.email).to.equal(user.email)
                expect(user2.password).to.equal(user.password)
                expect(user2.nickName).to.equal(user.nickName)
                expect(user2.ipGeoLocation).to.equal(user.ipGeoLocation)
                expect(user2.city).to.equal(user.city)
                expect(user2.avatar).to.be.null
                expect(user2.favArtists).to.have.lengthOf(0)
            })
    )

    it('succeeds on other existing user', () => {
        const user2 = generate.user()
        const users = [user2]

        return populate(users, [])
            .then(() => registerUser(user.name, user.email, user.password))
            .then(() => context.users.findOne({ email: user.email }))
            .then(user2 => {
                expect(user2).to.exist
                // expect(user2._id.toString()).to.equal(user._id.toString())
                expect(user2.name).to.equal(user.name)
                expect(user2.email).to.equal(user.email)
                expect(user2.password).to.equal(user.password)
                expect(user2.avatar).to.be.null
                expect(user2.favs).to.have.lengthOf(0)
            })
    })

    it('fails on existing user', () => {
        const users = [user]

        return populate(users, [])
            .then(() => registerUser(user.name, user.email, user.password))
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${user.email} already exists`)
            })
    })

    it('fails on empty name', () =>
        expect(() => registerUser('', user.email, user.password, () => { })).to.throw(Error, 'name is empty')
    )

    it('fails on empty email', () =>
        expect(() => registerUser(user.name, '', user.password, () => { })).to.throw(Error, 'email is empty')
    )

    it('fails on non-string name', () => {
        expect(() => registerUser(undefined, user.email, user.password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser(1, user.email, user.password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser(true, user.email, user.password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser({}, user.email, user.password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser([], user.email, user.password, () => { })).to.throw(Error, 'name is not a string')
    })

    it('fails on non-string email', () => {
        expect(() => registerUser(user.name, undefined, user.password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(user.name, 1, user.password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(user.name, true, user.password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(user.name, {}, user.password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(user.name, [], user.password, () => { })).to.throw(Error, 'email is not a string')
    })
    // TODO add more unhappies

    after(() => cleanUp().then(() => client.close()))
})