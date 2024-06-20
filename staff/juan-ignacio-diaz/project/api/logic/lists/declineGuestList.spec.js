require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List } = require('../../data/models')

const declineGuestList = require('./declineGuestList')

const { generateUser, generateList, cleanUp, populateUser, populateList } = require('../helpers/tests')

describe('declineGuestList', () =>{
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
        await declineGuestList(listTest.id, contactTest.id)
        const lists = await List.find({})
        expect(lists).to.have.length(1)
        const list = lists[0]
        expect(list.invited).to.have.lengthOf(0)
        expect(list.guests).to.have.lengthOf(0)
    })

    it('fails when user is not notify', async () => {
        await List.findByIdAndUpdate(listTest.id,  { $pullAll: { invited: [contactTest.id] } }) 
        try {
            return await declineGuestList(listTest.id, contactTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('not a user notify')
        }
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await declineGuestList(listTestNoExistsId, contactTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await declineGuestList(listTest.id, userTestNoExistsId)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => declineGuestList('', contactTest.id)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => declineGuestList(listTest.id, '')).to.throw(Error, 'user id does not have 24 characters')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )

})