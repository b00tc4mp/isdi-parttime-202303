require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List, Product } = require('../../../data/models')

const addProductToList = require('./addProductToList')

const { generateUser, generateList, generateStore, generateProduct, cleanUp, populateUser, populateList, populateStore } = require('../../helpers/tests')

describe('addProductToList', () =>{
    let userTest, contactTest, listTest, storeTest, productTest

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
        await List.findByIdAndUpdate(listTest.id,  { $push: { guests: [contactTest.id] } }) 
        await populateStore(listTest.id, storeTest)

        const type = Product.schema.path('type').enumValues[0]
        productTest = generateProduct(contactTest.id, [storeTest.name], type )
    })

    it('succeeds on add product', async () => {
        await addProductToList(listTest.id, contactTest.id, productTest.name, productTest.howMany, productTest.stores, productTest.type, productTest.comment)
        const lists = await List.find({})
        expect(lists).to.have.length(1)
        const list = lists[0]
        expect(list.products).to.have.lengthOf(1)
        expect(list.products[0].name).to.equal(productTest.name)
        expect(list.products[0].howMany).to.equal(productTest.howMany)
        expect(list.products[0].type).to.equal(productTest.type)
        expect(list.products[0].comment).to.equal(productTest.comment)
        expect(list.products[0].stores).to.have.lengthOf(1)
        expect(list.products[0].stores[0]).to.equal(storeTest.name)
    })

    it('fails on invalid type', async () => {
        const typeInvalid = 'Invalid'

        try {
            return await addProductToList(listTest.id, contactTest.id, productTest.name, productTest.howMany, productTest.stores, typeInvalid, productTest.comment)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`${typeInvalid} invalid type`)
        }
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await addProductToList(listTestNoExistsId, contactTest.id, productTest.name, productTest.howMany, productTest.stores, productTest.type, productTest.comment)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await addProductToList(listTest.id, userTestNoExistsId, productTest.name, productTest.howMany, productTest.stores, productTest.type, productTest.comment)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on store no exist', async () => {
        const storeTestNoExistsId = '000000000000000000000000'

        try {
            return await addProductToList(listTest.id, contactTest.id, productTest.name, productTest.howMany, [storeTestNoExistsId], productTest.type, productTest.comment)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`invalid store`)
        }
    })

    it('fails on empty listId', () => 
        expect(() => addProductToList('', contactTest.id, productTest.name, productTest.howMany, productTest.stores, productTest.type, productTest.comment)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => addProductToList(listTest.id, '', productTest.name, productTest.howMany, productTest.stores, productTest.type, productTest.comment)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty Product name ', () =>
        expect(() => addProductToList(listTest.id, contactTest.id, '', productTest.howMany, productTest.stores, productTest.type, productTest.comment)).to.throw(Error, 'name is empty')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})