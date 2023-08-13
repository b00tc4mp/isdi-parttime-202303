require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List, Product } = require('../../../data/models')

const markProductAsPurchased = require('./markProductAsPurchased')

const { generateUser, generateList, generateStore, generateProduct, cleanUp, populateUser, populateList, populateStore, populateProduct } = require('../../helpers/tests')
debugger
describe('markProductAsPurchased', () =>{
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
        productTest = generateProduct(contactTest.id, [storeTest.id], type )
        type2 = Product.schema.path('type').enumValues[1]
        productTest2 = generateProduct(userTest.id, [storeTest.id], type )

        await populateProduct(listTest.id, productTest)
    })

    it('succeeds on mark state product as purchased', async () => {
        await markProductAsPurchased(listTest.id, contactTest.id, productTest.id)
        let lists = await List.find({})
        expect(lists).to.have.length(1)
        let list = lists[0]
        expect(list.products).to.have.lengthOf(1)
        expect(list.products[0].state).to.equal('bought')
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await markProductAsPurchased(listTestNoExistsId, contactTest.id, productTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await markProductAsPurchased(listTest.id, userTestNoExistsId, productTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on existing product', async () => {
        const productTestNoExistsId = '000000000000000000000000'

        try {
            return await markProductAsPurchased(listTest.id, contactTest.id, productTestNoExistsId)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('product not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => markProductAsPurchased('', contactTest.id, productTest.id)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => markProductAsPurchased(listTest.id, '', productTest.id)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty productId ', () =>
        expect(() => markProductAsPurchased(listTest.id, contactTest.id, '')).to.throw(Error, 'product id does not have 24 characters')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})