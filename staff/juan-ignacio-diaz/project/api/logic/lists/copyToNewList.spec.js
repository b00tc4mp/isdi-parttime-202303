require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List, Product } = require('../../data/models')

const copyToNewList = require('./copyToNewList')

const { generateUser, generateList, generateStore, generateProduct, cleanUp, populateUser, populateList, populateStore, populateProduct } = require('../helpers/tests')
debugger
describe('copyToNewList', () =>{
    let userTest, contactTest, listTest, listTest2, listTest3, storeTest, type, type2, productTest, productTest2, productTest3

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        contactTest = generateUser()

        await cleanUp()
        await Promise.all([populateUser(userTest), populateUser(contactTest)])
        await User.findByIdAndUpdate(userTest.id,  { $push: { contacts: [contactTest.id] } }) 

        listTest = generateList(userTest.id)
        listTest2 = generateList(userTest.id)
        listTest3 = generateList(userTest.id)
        storeTest = generateStore()

        await populateList(listTest)
        await List.findByIdAndUpdate(listTest.id,  { $push: { guests: [contactTest.id] } }) 
        await populateStore(listTest.id, storeTest)
        await populateList(listTest2)
        await List.findByIdAndUpdate(listTest2.id,  { $push: { guests: [contactTest.id] } }) 
        await populateStore(listTest2.id, storeTest)

        type = Product.schema.path('type').enumValues[0]
        type2 = Product.schema.path('type').enumValues[1]
        productTest = generateProduct(contactTest.id, [storeTest.name], type, [userTest.id], [userTest.id, contactTest.id] )
        productTest2 = generateProduct(userTest.id, [storeTest.name], type2, [userTest.id], [userTest.id, contactTest.id] )
        productTest3 = generateProduct(userTest.id, [storeTest.name], type, [contactTest.id], [userTest.id, contactTest.id] )

        await populateProduct(listTest.id, productTest)
        await populateProduct(listTest.id, productTest2)
        await populateProduct(listTest.id, productTest3)

        await populateProduct(listTest2.id, productTest2)
        await populateProduct(listTest2.id, productTest3)
    })

    it('succeeds on copy list', async () => {
        await copyToNewList(listTest2.id, userTest.id, listTest3.name, listTest3.dateToEnd)
        const lists = await List.find({})
        expect(lists).to.have.length(3)
        const list = lists[2]
        expect(list).to.exist
        expect(list.id).to.be.a('string')
        expect(list.dateToEnd).to.deep.equal(listTest3.dateToEnd)
        expect(new Date(list.date)).to.be.a('date')
        expect(list.guests).to.have.lengthOf(1)
        expect(list.guests[0].toString()).to.equal(userTest.id)
        expect(list.invited).to.have.lengthOf(0)
    })

    it('fails when list already exist', async () => {

        try {
            return await copyToNewList(listTest2.id, userTest.id, listTest.name, listTest3.dateToEnd)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`list with name ${listTest.name} already exists`)
        }
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await copyToNewList(listTestNoExistsId, userTest.id, listTest.name, listTest.dateToEnd)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await copyToNewList(listTest2.id, userTestNoExistsId, listTest.name, listTest.dateToEnd)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => copyToNewList('', userTest.id, listTest.name, listTest.dateToEnd)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty userId', () => 
        expect(() => copyToNewList(listTest2.id, '', listTest.name, listTest.dateToEnd)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty name', () =>
        expect(() => copyToNewList(listTest2.id, userTest.id, '', listTest.dateToEnd)).to.throw(Error, 'name is empty')
    )

    it('fails on empty dateToEnd', () =>
        expect(() => copyToNewList(listTest2.id, userTest.id, listTest.name, '')).to.throw(Error, 'Date is not valid')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )

})