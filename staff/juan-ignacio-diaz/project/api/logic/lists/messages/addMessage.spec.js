require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List } = require('../../../data/models')

const addMessage = require('./addMessage')

const { generateUser, generateList, generateMessage, cleanUp, populateUser, populateList } = require('../../helpers/tests')

describe('addMessage', () =>{
    let userTest, contactTest, listTest, messageTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        contactTest = generateUser()

        await cleanUp()
        await Promise.all([populateUser(userTest), populateUser(contactTest)])
        await User.findByIdAndUpdate(userTest.id,  { $push: { contacts: [contactTest.id] } }) 

        listTest = generateList(userTest.id)
        messageTest = generateMessage(userTest.id)

        await populateList(listTest)
        return await List.findByIdAndUpdate(listTest.id,  { $push: { guests: [contactTest.id] } }) 
    })

    it('succeeds on add new message', async () => {
        await addMessage(listTest.id, contactTest.id, messageTest.text)
        const lists = await List.find({})
        expect(lists).to.have.length(1)
        const list = lists[0]
        expect(list.messages).to.have.lengthOf(1)
        expect(list.messages[0].text).to.equal(messageTest.text)
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await addMessage(listTestNoExistsId, contactTest.id, messageTest.text)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await addMessage(listTest.id, userTestNoExistsId, messageTest.text)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => addMessage('', contactTest.id, messageTest.text)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => addMessage(listTest.id, '', messageTest.text)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty message text ', () =>
        expect(() => addMessage(listTest.id, contactTest.id, '')).to.throw(Error, 'message is empty')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})