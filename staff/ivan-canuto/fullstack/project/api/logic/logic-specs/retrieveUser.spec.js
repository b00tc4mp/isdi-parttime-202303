require('dotenv').config()

const { expect } = require('chai')
const retrieveUser = require('../retrieveUser')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User } = require('../../data/models')
const { mongoose: { Types: { ObjectId } } } = require('mongoose')

describe('retrieveUser', () => {
    let user, name, email

    before(async () => await mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        try {
            await cleanUp()

            user = generate.user()
            name = user.name
            email = user.email

            await populate(user, [])
        } catch (error) {
            
        }
    })

    it('succeeds on rtrieving user', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const userFound = await retrieveUser(userId)

            expect(userFound).to.exist
            expect(userFound).to.be.an('object')
            expect(userFound.id).to.equal(userId)
            expect(userFound.name).to.equal(name)
            expect(userFound.email).to.equal(email)
            expect(userFound.avatar).to.be.null
            expect(userFound.seenLately).to.be.an('array')
            expect(userFound.seenLately).to.have.lengthOf(0)

        } catch (error) {
            
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const wrongUserId = '6102a3cbf245ef001c9a1837'
            
            await retrieveUser(wrongUserId)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })

    it('fails on empty user id', () => expect(() => retrieveUser('')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        expect(() => retrieveUser(true)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveUser([])).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveUser({})).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveUser(undefined)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveUser(1)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => retrieveUser('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})