require('dotenv').config()
const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
const { expect } = require('chai')
const { describe } = require('mocha')
const { cleanUp, generateUser, generateWorkspot } = require('../helpers/tests')
const { errors: { ContentError, DuplicityError, UnknownError, ExistenceError } } = require('com')
const { User, Workspot } = require('../../data/models')
const createWorkspot = require('./createWorkspot')

describe('createWorkspot', () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user
    let workspot

    beforeEach(async () => {
        user = generateUser()
        workspot = generateWorkspot()
        await cleanUp()
    })

    after(async () => {
        await mongoose.disconnect()
    })

    it('should succed on create a new worskpot', async () => {
        newUser = generateUser()
        const user = await User.create(newUser)
        await User.updateOne({ email: user.email }, { $set: { id:'123456789012345678901234' } })
        workspot = generateWorkspot()
 
        debugger
        
        await createWorkspot(user.id, workspot.image, workspot.name, workspot.location, workspot.description, workspot.category, workspot.features)

        debugger

        const createdWorkspot = await Workspot.findOne({ name: workspot.name })

        debugger

        expect(createdWorkspot).to.exist
        expect(createdWorkspot.image).to.equal(workspot.image)
        expect(createdWorkspot.name).to.equal(workspot.name)
        expect(createdWorkspot.location).to.equal(workspot.location)
        expect(createdWorkspot.description).to.equal(workspot.description)
        expect(createdWorkspot.category).to.equal(workspot.category)
        expect(createdWorkspot.features).to.equal(workspot.features)

    })

    it('should succeed when another other workspots are already created', async () => {
        const otherWorkspot = generateWorkspot()
        await Workspot.create(otherWorkspot)
        workspot = generateWorkspot()
        
        await createWorkspot(user._id, workspot.image, workspot.name, workspot.location, workspot.description, workspot.category, workspot.features)

        const createdWorkspot = await Workspot.findOne({ name: workspot.name })

        debugger

        expect(createdWorkspot).to.exist
        expect(createdWorkspot.image).to.equal(workspot.image)
        expect(createdWorkspot.name).to.equal(workspot.name)
        expect(createdWorkspot.location).to.equal(workspot.location)
        expect(createdWorkspot.description).to.equal(workspot.description)
        expect(createdWorkspot.category).to.equal(workspot.category)
        expect(createdWorkspot.features).to.equal(workspot.features)
    })

    it('should fail on a non-existent user', async () => {
        const userId = new ObjectId('123456789012345678901234')

        try {
            await createWorkspot(userId, workspot.image, workspot.name, workspot.location, workspot.description, workspot.category, workspot.features)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user with id ${userId} not found`)
        }
    })

    it('should fail on empty image', () => {
        const userId = '123456789012345678901234'
        workspot = generateWorkspot()

        expect(() => createWorkspot(userId, '', workspot.name, workspot.location, workspot.description, workspot.category, workspot.features)).to.throw(ContentError, 'url is empty')
    })

    it('should fail on empty name', () => {
        const userId = '123456789012345678901234'
        workspot = generateWorkspot()

        expect(() => createWorkspot(userId, workspot.image, '', workspot.location, workspot.description, workspot.category, workspot.features)).to.throw(ContentError, 'name is empty')
    })

    it('should fail on empty location', () => {
        const userId = '123456789012345678901234'
        workspot = generateWorkspot()

        expect(() => createWorkspot(userId, workspot.image, workspot.name, '', workspot.description, workspot.category, workspot.features)).to.throw(ContentError, 'location is an empty object')
    })

    it('should fail on empty description', () => {
        const userId = '123456789012345678901234'
        workspot = generateWorkspot()

        expect(() => createWorkspot(userId, workspot.image, '', workspot.location, '', workspot.category, workspot.features)).to.throw(ContentError, 'description is empty')
    })
    it('should fail on empty category', () => {
        const userId = '123456789012345678901234'
        workspot = generateWorkspot()

        expect(() => createWorkspot(userId, workspot.image, workspot.name, workspot.location, workspot.description, '', workspot.features)).to.throw(ContentError, 'category is an empty object')
    })

    it('should fail on empty features', () => {
        const userId = '123456789012345678901234'
        workspot = generateWorkspot()

        expect(() => createWorkspot(userId, workspot.image, workspot.name, workspot.location, workspot.description, workspot.category, '')).to.throw(ContentError, 'features is an empty object')
    })

    it('should fail on non-string image url', () => {
        const userId = '123456789012345678901234'
        workspot = generateWorkspot()

        expect(() => createWorkspot(userId, undefined, workspot.name, workspot.location, workspot.description, workspot.category, '')).to.throw(TypeError, 'url is not a string')
        expect(() => createWorkspot(userId, 1, workspot.name, workspot.location, workspot.description, workspot.category, '')).to.throw(TypeError, 'url is not a string')
        expect(() => createWorkspot(userId, true, workspot.name, workspot.location, workspot.description, workspot.category, '')).to.throw(TypeError, 'url is not a string')
        expect(() => createWorkspot(userId, {}, workspot.name, workspot.location, workspot.description, workspot.category, '')).to.throw(TypeError, 'url is not a string')
        expect(() => createWorkspot(userId, [], workspot.name, workspot.location, workspot.description, workspot.category, '')).to.throw(TypeError, 'url is not a string')
    })

    it('should fail on non-string name', () => {
        const userId = '123456789012345678901234'
        workspot = generateWorkspot()

        expect(() => createWorkspot(userId, workspot.image, undefined, workspot.location, workspot.description, workspot.category, workspot.features)).to.throw(TypeError, 'name is not a string')
        expect(() => createWorkspot(userId, workspot.image, 1, workspot.location, workspot.description, workspot.category, workspot.features)).to.throw(TypeError, 'name is not a string')
        expect(() => createWorkspot(userId, workspot.image, true, workspot.location, workspot.description, workspot.category, workspot.features)).to.throw(TypeError, 'name is not a string')
        expect(() => createWorkspot(userId, workspot.image, {}, workspot.location, workspot.description, workspot.category, workspot.features)).to.throw(TypeError, 'name is not a string')
        expect(() => createWorkspot(userId, workspot.image, [], workspot.location, workspot.description, workspot.category, workspot.features)).to.throw(TypeError, 'name is not a string')
    })

    it('should fail on non-string description', () => {
        const userId = '123456789012345678901234'
        workspot = generateWorkspot()

        expect(() => createWorkspot(userId, workspot.image, workspot.name, workspot.location, undefined, workspot.category, workspot.features)).to.throw(TypeError, 'name is not a string')
        expect(() => createWorkspot(userId, workspot.image, workspot.name, workspot.location, 1, workspot.category, workspot.features)).to.throw(TypeError, 'name is not a string')
        expect(() => createWorkspot(userId, workspot.image, workspot.name, workspot.location, true, workspot.category, workspot.features)).to.throw(TypeError, 'name is not a string')
        expect(() => createWorkspot(userId, workspot.image, workspot.name, workspot.location, {}, workspot.category, workspot.features)).to.throw(TypeError, 'name is not a string')
        expect(() => createWorkspot(userId, workspot.image, workspot.name, workspot.location, [], workspot.category, workspot.features)).to.throw(TypeError, 'name is not a string')
    })


    it('should fail on non-object location', () => {
        const userId = '123456789012345678901234'
        workspot = generateWorkspot()

        expect(() => createWorkspot(userId, workspot.image, workspot.name, undefined, workspot.description, workspot.category, workspot.features)).to.throw(TypeError, 'location is not an object')
        expect(() => createWorkspot(userId, workspot.image, workspot.name, 1, workspot.description, workspot.category, workspot.features)).to.throw(TypeError, 'location is not an object')
        expect(() => createWorkspot(userId, workspot.image, workspot.name, true, workspot.description, workspot.category, workspot.features)).to.throw(TypeError, 'location is not an object')
        expect(() => createWorkspot(userId, workspot.image, workspot.name, {}, workspot.description, workspot.category, workspot.features)).to.throw(TypeError, 'location is not an object')
        expect(() => createWorkspot(userId, workspot.image, workspot.name, [], workspot.description, workspot.category, workspot.features)).to.throw(TypeError, 'location is not an objectg')
    })

})

