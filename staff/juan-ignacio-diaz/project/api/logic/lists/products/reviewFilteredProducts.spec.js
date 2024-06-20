require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List, Product } = require('../../../data/models')

const reviewFilteredProducts = require('./reviewFilteredProducts')

const { generateUser, generateList, generateStore, generateProduct, cleanUp, populateUser, populateList, populateStore, populateProduct } = require('../../helpers/tests')

describe('reviewFilteredProducts', () =>{
    let userTest, contactTest, listTest, listTest2, storeTest, type, type2, productTest, productTest2, productTest3


    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        contactTest = generateUser()

        await cleanUp()
        await Promise.all([populateUser(userTest), populateUser(contactTest)])
        await User.findByIdAndUpdate(userTest.id,  { $push: { contacts: [contactTest.id] } }) 

        listTest = generateList(userTest.id)
        listTest2 = generateList(userTest.id)
        storeTest = generateStore()

        await populateList(listTest)
        await List.findByIdAndUpdate(listTest.id,  { $push: { guests: [contactTest.id] } }) 
        await populateStore(listTest.id, storeTest)
        await populateList(listTest2)
        await List.findByIdAndUpdate(listTest2.id,  { $push: { guests: [contactTest.id] } }) 
        await populateStore(listTest2.id, storeTest)

        type = Product.schema.path('type').enumValues[0]
        type2 = Product.schema.path('type').enumValues[1]
        productTest = generateProduct(contactTest.id, [storeTest.id], type, [userTest.id], [userTest.id, contactTest.id] )
        productTest2 = generateProduct(userTest.id, [storeTest.id], type2, [userTest.id], [userTest.id, contactTest.id] )
        productTest3 = generateProduct(userTest.id, [storeTest.id], type, [contactTest.id], [userTest.id, contactTest.id] )

        await populateProduct(listTest.id, productTest)
        await populateProduct(listTest.id, productTest2)
        await populateProduct(listTest.id, productTest3)

        await populateProduct(listTest2.id, productTest2)
        await populateProduct(listTest2.id, productTest3)

    })

    it('succeeds on review product list 1', async () => {
        const products = await reviewFilteredProducts(listTest.id, contactTest.id, 
            {_id: listTest.id} , 
            'name')
        expect(products).to.have.length(3)
        const product = products[0]
    })

    it('succeeds on review product list 1 type 1', async () => {
        const products = await reviewFilteredProducts(listTest.id, contactTest.id, 
            {_id: listTest.id, typeCheck: true, type: [type]} , 
            'name')
        expect(products).to.have.length(2)
        const product = products[0]
   
    })

    it('succeeds on review product list 1 store 1', async () => {
        const products = await reviewFilteredProducts(listTest.id, contactTest.id, 
            {_id: listTest.id, storesCheck: true, stores: [storeTest.id]} , 
            'name')
        expect(products).to.have.length(3)
        const product = products[0]
   
    })

    it('succeeds on review product list 1 state 1', async () => {
        const products = await reviewFilteredProducts(listTest.id, contactTest.id, 
            {_id: listTest.id, stateCheck: true, state: ['']} , 
            'name')
        expect(products).to.have.length(3)
        const product = products[0]
   
    })

    it('succeeds on review product list 1 likes 1', async () => {
        const products = await reviewFilteredProducts(listTest.id, contactTest.id, 
            {_id: listTest.id, likesCheck: true, likes: 1} , 
            'name')
        expect(products).to.have.length(0)
        const product = products[0]
   
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await reviewFilteredProducts(listTestNoExistsId, contactTest.id, {_id: listTest.id}, '')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await reviewFilteredProducts(listTest.id, userTestNoExistsId, {_id: listTest.id}, '')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => reviewFilteredProducts('', contactTest.id, {_id: listTest.id}, '')).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => reviewFilteredProducts(listTest.id, '', {_id: listTest.id}, '')).to.throw(Error, 'user id does not have 24 characters')
    )


    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})