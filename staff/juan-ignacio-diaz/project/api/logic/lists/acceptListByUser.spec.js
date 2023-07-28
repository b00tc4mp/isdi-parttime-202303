require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List } = require('../../data/models')

const acceptListByUser = require('./acceptListByUser')

const { generateUser, generateList, cleanUp, populateUser, populateList } = require('../helpers/tests')

describe('acceptListByUser', () =>{
    let userTest, contactTest, contactTest2, listTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        contactTest = generateUser()

        await cleanUp()
        await Promise.all([populateUser(userTest), populateUser(contactTest)])
        await User.findByIdAndUpdate(userTest.id,  { $push: { contacts: [contactTest.id] } }) 

        listTest = generateList(userTest.id)
        await populateList(listTest)
        return await List.findByIdAndUpdate(listTest.id,  { $push: { notifyAcceptList: [contactTest.id] } })
    })

    it('succeeds on accept new list', async () => {
        await acceptListByUser(listTest.id, contactTest.id)
        const lists = await List.find({})
        expect(lists).to.have.length(1)
        const list = lists[0]
        expect(list.notifyAcceptList).to.have.lengthOf(0)
        expect(list.users).to.have.lengthOf(1)
        expect(list.users[0].toString()).to.equal(contactTest.id)
    })

    it('fails when user is not notify', async () => {
        await List.findByIdAndUpdate(listTest.id,  { $pullAll: { notifyAcceptList: [contactTest.id] } }) 
        try {
            return await acceptListByUser(listTest.id, contactTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('not a user notify')
        }
    })

    it('fails when user already exist', async () => {
        await List.findByIdAndUpdate(listTest.id,  { $push: { users: [contactTest.id] } }) 
        try {
            return await acceptListByUser(listTest.id, contactTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user already exists')
        }
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await acceptListByUser(listTestNoExistsId, contactTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await acceptListByUser(listTest.id, userTestNoExistsId)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => acceptListByUser('', contactTest.id)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => acceptListByUser(listTest.id, '')).to.throw(Error, 'user id does not have 24 characters')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )

})