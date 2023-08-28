require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List } = require('../../data/models')

const retrieveUsersList = require('./retrieveUsersList')

const { generateUser, generateList, cleanUp, populateUser, populateList } = require('../helpers/tests')

describe('retrieveUsersList', () =>{
    let userTest, contactTest, contactTest2, listTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        contactTest = generateUser()
        contactTest2 = generateUser()

        await cleanUp()
        await Promise.all([populateUser(userTest), populateUser(contactTest), populateUser(contactTest2)])
        await User.findByIdAndUpdate(userTest.id,  { $push: { contacts: [contactTest.id, contactTest2.id] } }) 

        listTest = generateList(userTest.id)
        await populateList(listTest)
        await List.findByIdAndUpdate(listTest.id,  { $push: { invited: [contactTest.id] } })
        return await List.findByIdAndUpdate(listTest.id,  { $push: { guests: [contactTest2.id] } })
    })

    it('succeeds on retieve list', async () => {
        const list = await retrieveUsersList(listTest.id, userTest.id)
        expect(list.invited).to.have.lengthOf(1)
        expect(list.invited[0].id).to.equal(contactTest.id)
        expect(list.guests).to.have.lengthOf(1)
        expect(list.guests[0].id).to.equal(contactTest2.id)
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await retrieveUsersList(listTestNoExistsId, userTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await retrieveUsersList(listTest.id, userTestNoExistsId)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => retrieveUsersList('', userTest.id)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => retrieveUsersList(listTest.id, '')).to.throw(Error, 'user id does not have 24 characters')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )

})