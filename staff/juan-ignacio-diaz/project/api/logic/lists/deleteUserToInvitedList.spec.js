require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List } = require('../../data/models')

const deleteUserToInvitedList = require('./deleteUserToInvitedList')

const { generateUser, generateList, cleanUp, populateUser, populateList } = require('../helpers/tests')

describe('deleteUserToInvitedList', () =>{
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
        return await List.findByIdAndUpdate(listTest.id,  { $push: { invited: [contactTest.id] } })
    })

    it('succeeds on decline new list', async () => {
        await deleteUserToInvitedList(listTest.id, userTest.id, contactTest.id)
        const lists = await List.find({})
        expect(lists).to.have.length(1)
        const list = lists[0]
        expect(list.invited).to.have.lengthOf(0)
        expect(list.guests).to.have.lengthOf(0)
    })

    it('fails when user is not owner', async () => {
        try {
            return await deleteUserToInvitedList(listTest.id, contactTest.id, contactTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('owner not valid')
        }
    })

    it('fails when user is not valid', async () => {
        await List.findByIdAndUpdate(listTest.id,  { $pullAll: { invited: [contactTest.id] } }) 
        try {
            return await deleteUserToInvitedList(listTest.id, userTest.id, contactTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('not a user notify')
            
        }
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await deleteUserToInvitedList(listTestNoExistsId, userTest.id, contactTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await deleteUserToInvitedList(listTest.id, userTestNoExistsId, contactTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on existing contact', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await deleteUserToInvitedList(listTest.id, userTest.id, userTestNoExistsId)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('contact not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => deleteUserToInvitedList('', userTest.id, contactTest.id)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => deleteUserToInvitedList(listTest.id, '', contactTest.id)).to.throw(Error, 'user id does not have 24 characters')       
    )

    it('fails on empty contactId', () =>
    expect(() => deleteUserToInvitedList(listTest.id, userTest.id, '')).to.throw(Error, 'contact id does not have 24 characters')
)

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )

})