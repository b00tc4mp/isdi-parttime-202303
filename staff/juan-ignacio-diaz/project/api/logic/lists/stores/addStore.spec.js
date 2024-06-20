require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List } = require('../../../data/models')

const addStore = require('./addStore')

const { generateUser, generateList, generateStore, cleanUp, populateUser, populateList } = require('../../helpers/tests')

describe('addStore', () =>{
    let userTest, contactTest, listTest, storeTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        contactTest = generateUser()

        await cleanUp()
        await Promise.all([populateUser(userTest), populateUser(contactTest)])
        await User.findByIdAndUpdate(userTest.id,  { $push: { contacts: [contactTest.id] } }) 

        listTest = generateList(userTest.id)
        storeTest = generateStore()

        await populateList(listTest)
        return await List.findByIdAndUpdate(listTest.id,  { $push: { guests: [contactTest.id] } }) 
    })

    it('succeeds on add new Store', async () => {
        await addStore(listTest.id, contactTest.id, storeTest.name)
        const lists = await List.find({})
        expect(lists).to.have.length(1)
        const list = lists[0]
        expect(list.stores).to.have.lengthOf(1)
        expect(list.stores[0].name).to.equal(storeTest.name)
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await addStore(listTestNoExistsId, contactTest.id, storeTest.name)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await addStore(listTest.id, userTestNoExistsId, storeTest.name)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on store already exist', async () => {
        await List.findByIdAndUpdate(listTest.id, { $push: { store: [storeTest] } }) 

        try {
            return await addStore(listTest.id, contactTest.id, storeTest.name)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`store with name ${storeTest.name} already exists`)
        }
    })

    it('fails on empty listId', () => 
        expect(() => addStore('', contactTest.id, storeTest.name)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => addStore(listTest.id, '', storeTest.name)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty Store text ', () =>
        expect(() => addStore(listTest.id, contactTest.id, '')).to.throw(Error, 'name is empty')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})