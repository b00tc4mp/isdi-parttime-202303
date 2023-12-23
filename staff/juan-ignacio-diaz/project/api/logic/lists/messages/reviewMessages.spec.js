require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List } = require('../../../data/models')

const reviewMessages = require('./reviewMessages')

const { generateUser, generateList, generateMessage, cleanUp, populateUser, populateList, populateMessage } = require('../../helpers/tests')
debugger
describe('reviewMessages', () =>{
    let userTest, contactTest, listTest, messageTest, messageTest2

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        contactTest = generateUser()

        await cleanUp()
        await Promise.all([populateUser(userTest), populateUser(contactTest)])
        await User.findByIdAndUpdate(userTest.id,  { $push: { contacts: [contactTest.id] } }) 

        listTest = generateList(userTest.id)
        messageTest = generateMessage(userTest.id, [contactTest.id])
        messageTest2 = generateMessage(contactTest.id, [userTest.id])

        await populateList(listTest)
        await List.findByIdAndUpdate(listTest.id,  { $push: { guests: [userTest.id, contactTest.id] } }) 

        await populateMessage(listTest.id, messageTest)
        return await populateMessage(listTest.id, messageTest2)
    })

    it('succeeds on retrieve messages', async () => {
        const messages = await reviewMessages(listTest.id, userTest.id)
        expect(messages).to.have.length(2)
        const message = messages[0]
        expect(message.text).to.equal(messageTest2.text)
        expect(message.reviewed).to.equal(true)
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await reviewMessages(listTestNoExistsId, userTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await reviewMessages(listTest.id, userTestNoExistsId)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => reviewMessages('', userTest.id)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => reviewMessages(listTest.id, '')).to.throw(Error, 'user id does not have 24 characters')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})