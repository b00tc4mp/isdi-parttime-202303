require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List, Product } = require('../../../data/models')

const deleteProductToList = require('./deleteProductToList')

const { generateUser, generateList, generateStore, generateProduct, cleanUp, populateUser, populateList, populateStore, populateProduct } = require('../../helpers/tests')

describe('deleteProductToList', () =>{
    let userTest, contactTest, listTest, storeTest, productTest, productTest2

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
        productTest = generateProduct(contactTest.id, [storeTest.id], type )
        productTest2 = generateProduct(userTest.id, [storeTest.id], type )
        await populateProduct(listTest.id, productTest)
        await populateProduct(listTest.id, productTest2)

    })

    it('succeeds on delete product', async () => {
        await deleteProductToList(listTest.id, contactTest.id, productTest.id)
        const lists = await List.find({})
        expect(lists).to.have.length(1)
        const list = lists[0]
        expect(list.products).to.have.lengthOf(1)
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await deleteProductToList(listTestNoExistsId, contactTest.id, productTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await deleteProductToList(listTest.id, userTestNoExistsId, productTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => deleteProductToList('', contactTest.id, productTest.id)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => deleteProductToList(listTest.id, '', productTest.id)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty Product name ', () =>
        expect(() => deleteProductToList(listTest.id, contactTest.id, '')).to.throw(Error, 'product id does not have 24 characters')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})