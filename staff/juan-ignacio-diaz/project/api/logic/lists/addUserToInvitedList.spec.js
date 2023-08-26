require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List } = require('../../data/models')

const addUserToInvitedList = require('./addUserToInvitedList')

const { generateUser, generateList, cleanUp, populateUser, populateList } = require('../helpers/tests')

describe('addUsersToInvitedList', () =>{
    let userTest, contactTest, contactTest2, listTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        contactTest = generateUser()
        contactTest2 = generateUser()

        await cleanUp()
        await Promise.all([populateUser(userTest), populateUser(contactTest), populateUser(contactTest2)])
        await User.findByIdAndUpdate(userTest.id,  { $push: { contacts: [contactTest.id] } }) 

        listTest = generateList(userTest.id)
        return await populateList(listTest)
    })

    it('succeeds on add new user', async () => {
        await addUsersToInvitedList(listTest.id, userTest.id, contactTest.id)
        const lists = await List.find({})
        expect(lists).to.have.length(1)
        const list = lists[0]
        expect(list.invited).to.have.lengthOf(1)
        expect(list.invited[0].toString()).to.equal(contactTest.id)
    })

    it('fails when contact already exist', async () => {
        await List.findByIdAndUpdate(listTest.id,  { $push: { invited: [contactTest.id] } }) 
        try {
            return await addUsersToInvitedList(listTest.id, userTest.id, contactTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('contact already exists')
        }
    })

    it('fails when contact is not contact', async () => {
        try {
            return await addUsersToInvitedList(listTest.id, userTest.id, contactTest2.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('not a user contact')
        }
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await addUsersToInvitedList(listTestNoExistsId, userTest.id, contactTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await addUsersToInvitedList(listTest.id, userTestNoExistsId, contactTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on existing contact', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await addUsersToInvitedList(listTest.id, userTest.id, userTestNoExistsId)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('contact not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => addUsersToInvitedList('', userTest.id, contactTest.id)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => addUsersToInvitedList(listTest.id, '', contactTest.id)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty contactId', () =>
        expect(() => addUsersToInvitedList(listTest.id, userTest.id, '')).to.throw(Error, 'user id does not have 24 characters')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )

})