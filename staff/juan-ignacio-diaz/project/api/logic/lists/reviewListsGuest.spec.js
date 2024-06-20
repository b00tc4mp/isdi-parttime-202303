require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List } = require('../../data/models')

const reviewListsGuest = require('./reviewListsGuest')

const { generateUser, generateList, cleanUp, populateUser, populateList } = require('../helpers/tests')

describe('reviewListsGuest', () =>{
    let userTest, contactTest, listTest, listTest2

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        contactTest = generateUser()

        await cleanUp()
        await Promise.all([populateUser(userTest), populateUser(contactTest)])
        await User.findByIdAndUpdate(userTest.id,  { $push: { contacts: [contactTest.id] } }) 

        listTest = generateList(userTest.id)
        listTest.guests.push(contactTest.id)
        listTest2 = generateList(userTest.id)
        listTest2.guests.push(contactTest.id)
        await populateList(listTest)
        return await populateList(listTest2)
    })

    it('succeeds on retrieve list', async () => {
        const lists = await reviewListsGuest(contactTest.id)
        expect(lists).to.have.length(2)
        const list = lists[0]
        expect(list.name).to.equal(listTest2.name)
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await reviewListsGuest(userTestNoExistsId)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty userId', () =>
        expect(() => reviewListsGuest('')).to.throw(Error, 'user id does not have 24 characters')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )

})