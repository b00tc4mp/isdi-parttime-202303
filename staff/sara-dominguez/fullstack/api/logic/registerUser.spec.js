require('dotenv').config()
const { expect } = require('chai')
const { cleanUp, populate, generate } = require('./helpers/tests')
const registerUser = require('./registerUser')
const { MongoClient } = require('mongodb')
const context = require('./context')


describe('registerUser', () => {
    //1º conectamos con Mongo y utilizamos contexto para las conexiones

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

    // 2º creamos un usuario

    let user

    beforeEach(() => {
        user = generate.user()

        return cleanUp()
    })

    it('should succeed on new user', () => {

        registerUser(user.name, user.email, user.password)
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

    it('should succeed on others existing user', () => {
        const user2 = generate.user()
        const users = [user2]

        return populate(users, [])
            .then(() =>
                registerUser(user.name, user.email, user.password))
            .then(() => context.users.findOne({ email: user.email }))
            .then(user2 => {
                expect(user2).to.exist
                // expect(user2._id.toString()).to.equal(user._id.toString())
                expect(user2.name).to.equal(user.name)
                expect(user2.email).to.equal(user.email)
                expect(user2.password).to.equal(user.password)
                // expect(user2.avatar).to.be.null
                expect(user2.favs).to.have.lengthOf(0)
            })
    })


    it('should fail on existing user', () => {
        const users = [user]

        return populate(users, [])

            .then(() => registerUser(user.name, user.email, user.password))
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${user.email} already exists`)

            })
    })

    //errores procesos síncronos
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

    it('fails on name lenght', () => {
        expect(() => registerUser('Jd', user.email, user.password, () => { })).to.throw(Error, 'name minimun 3 characters')
        expect(() => registerUser('acb123456789012345', user.email, user.password, () => { })).to.throw(Error, 'name maximun 15 characters')

    })
    //TODO other validators situations

    after(() => cleanUp().then(() => client.close()))


})

