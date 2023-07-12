require('dotenv').config()

const { expect } = require('chai')
const { MongoClient, ObjectId } = require('mongodb')
const context = require('../logic/context')

const retrieveUser = require('../logic/retrieveUser')

const { generateUser, cleanUp, populate} = require('../logic/helpers/tests')
const authenticateUser = require('../logic/authenticateUser')

describe('retrieveUser', () => {
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

    let userTest

    beforeEach(() => {
        userTest = generateUser()

        return cleanUp()
    })
debugger
    it('succeeds on existing user and correct id', () => {
        return populate([userTest], [])
            .then(context.users.findOne({}))
            .then(user => retrieveUser(user._id.toString()))
            .then(user => {
                expect(user.name).to.equal(userTest.name)
                expect(user.email).to.equal(userTest.email)
                expect(user.avatar).to.equal(userTest.avatar)
            })
            .catch(error => expect(error).to.be.null)
    })

    it('succeeds on existing user with no avatar and correct id', () => {
        userTest.avatar = null

        return populate([userTest], [])
            .then(context.users.findOne({ _id: new ObjectId(userTest._id.toString())}))
            .then(user => retrieveUser(user._id.toString()))
            .then(user => {
                expect(user.name).to.equal(userTest.name)
                expect(user.email).to.equal(userTest.email)
                expect(user.avatar).to.be.null
            })
            .catch(error => expect(error).to.be.null)
    })

    it('fails on existing user and incorrect id', () => {
        return populate([userTest], [])
            .then(context.users.findOne({}))
            .then(user => {
                const wrongId = user._id.toString() + '-wrong'

                retrieveUser(wrongId)})
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('user not found')
                expect(user).to.be.undefined  
            })
    })

    it('fails on empty userId', () =>
        expect(() => retrieveUser('', () => {})).to.throw(Error, 'id is empty')
    )

    it('fails on userId not exist', () => {
        const userIdNoExist = userTest._id.toString() + 'NoExist'

        return retrieveUser(userIdNoExist)
            .then(user => expect(user).to.be.undefined)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('user not found')
            })
    })

    after(() => cleanUp().then(() => client.close()))
})