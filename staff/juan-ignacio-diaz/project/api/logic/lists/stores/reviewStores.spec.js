require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List } = require('../../../data/models')

const reviewStores = require('./reviewStores')

const { generateUser, generateList, generateStore, cleanUp, populateUser, populateList, populateStore } = require('../../helpers/tests')
debugger
describe('reviewStores', () =>{
    let userTest, contactTest, listTest, storeTest, storeTest2

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        contactTest = generateUser()

        await cleanUp()
        await Promise.all([populateUser(userTest), populateUser(contactTest)])
        await User.findByIdAndUpdate(userTest.id,  { $push: { contacts: [contactTest.id] } }) 

        listTest = generateList(userTest.id)
        storeTest = generateStore()
        storeTest2 = generateStore()

        await populateList(listTest)
        await List.findByIdAndUpdate(listTest.id,  { $push: { guests: [contactTest.id] } }) 
        
        await populateStore(listTest.id, storeTest)
        return await populateStore(listTest.id, storeTest2)
    })

    it('succeeds on retrieve stores', async () => {
        const stores = await reviewStores(listTest.id, userTest.id)
        expect(stores).to.have.length(2)
        const store = stores[0]

        const firstName = storeTest.name <= storeTest2.name ? storeTest.name : storeTest2.name
        expect(store.name).to.equal(firstName)
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await reviewStores(listTestNoExistsId, userTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await reviewStores(listTest.id, userTestNoExistsId)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => reviewStores('', userTest.id)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => reviewStores(listTest.id, '')).to.throw(Error, 'user id does not have 24 characters')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})