require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List, Product } = require('../../../data/models')

const editProductToList = require('./editProductToList')

const { generateUser, generateList, generateStore, generateProduct, cleanUp, populateUser, populateList, populateStore, populateProduct } = require('../../helpers/tests')

describe('editProductToList', () =>{
    let userTest, contactTest, listTest, storeTest, productTest, productTest2, type, type2

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

        type = Product.schema.path('type').enumValues[0]
        productTest = generateProduct(contactTest.id, [storeTest.name], type )
        type2 = Product.schema.path('type').enumValues[1]
        productTest2 = generateProduct(userTest.id, [storeTest.name], type )

        await populateProduct(listTest.id, productTest)
    })

    it('succeeds onn edit product', async () => {
        await editProductToList(listTest.id, contactTest.id, productTest.id, productTest2.name, productTest2.howMany, productTest2.stores, productTest2.type, productTest2.comment)
        const lists = await List.find({})
        expect(lists).to.have.length(1)
        const list = lists[0]
        expect(list.products).to.have.lengthOf(1)
        expect(list.products[0].name).to.equal(productTest2.name)
        expect(list.products[0].howMany).to.equal(productTest2.howMany)
        expect(list.products[0].type).to.equal(productTest2.type)
        expect(list.products[0].comment).to.equal(productTest2.comment)
        expect(list.products[0].stores).to.have.lengthOf(1)
        expect(list.products[0].stores[0]).to.equal(storeTest.name)
    })

    it('fails on invalid type', async () => {
        const typeInvalid = 'Invalid'

        try {
            return await editProductToList(listTest.id, contactTest.id, productTest.id, productTest2.name, productTest2.howMany, productTest2.stores, productTest2.type, productTest2.comment)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`${typeInvalid} invalid type`)
        }
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await editProductToList(listTestNoExistsId, contactTest.id, productTest.id, productTest2.name, productTest2.howMany, productTest2.stores, productTest2.type, productTest2.comment)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await editProductToList(listTest.id, userTestNoExistsId, productTest.id, productTest2.name, productTest2.howMany, productTest2.stores, productTest2.type, productTest2.comment)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on existing product', async () => {
        const productTestNoExistsId = '000000000000000000000000'

        try {
            return await editProductToList(listTest.id, contactTest.id, productTestNoExistsId, productTest2.name, productTest2.howMany, productTest2.stores, productTest2.type, productTest2.comment)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('product not found')
        }
    })


    it('fails on store no exist', async () => {
        const storeTestNoExistsId = '000000000000000000000000'

        try {
            return await editProductToList(listTest.id, contactTest.id, productTest.id, productTest2.name, productTest2.howMany, [storeTestNoExistsId], productTest2.type, productTest2.comment)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`invalid store`)
        }
    })

    it('fails on empty listId', () => 
        expect(() => editProductToList('', contactTest.id, productTest.id, productTest2.name, productTest2.howMany, productTest2.stores, productTest2.type, productTest2.comment)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => editProductToList(listTest.id, '', productTest.id, productTest2.name, productTest2.howMany, productTest2.stores, productTest2.type, productTest2.comment)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty productId ', () =>
        expect(() => editProductToList(listTest.id, contactTest.id, '', productTest2.name, productTest2.howMany, productTest2.stores, productTest2.type, productTest2.comment)).to.throw(Error, 'product id does not have 24 characters')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})