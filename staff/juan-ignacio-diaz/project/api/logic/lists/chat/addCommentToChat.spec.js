require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List } = require('../../../data/models')

const addCommentToChat = require('./addCommentToChat')

const { generateUser, generateList, generateComment, cleanUp, populateUser, populateList } = require('../../helpers/tests')

describe('addCommentToChat', () =>{
    let userTest, contactTest, listTest, commentTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        contactTest = generateUser()

        await cleanUp()
        await Promise.all([populateUser(userTest), populateUser(contactTest)])
        await User.findByIdAndUpdate(userTest.id,  { $push: { contacts: [contactTest.id] } }) 

        listTest = generateList(userTest.id)
        commentTest = generateComment(userTest.id)

        await populateList(listTest)
        return await List.findByIdAndUpdate(listTest.id,  { $push: { users: [contactTest.id] } }) 
    })

    it('succeeds on add new comment', async () => {
        await addCommentToChat(listTest.id, contactTest.id, commentTest.text)
        const lists = await List.find({})
        expect(lists).to.have.length(1)
        const list = lists[0]
        expect(list.chat).to.have.lengthOf(1)
        expect(list.chat[0].text).to.equal(commentTest.text)
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await addCommentToChat(listTestNoExistsId, contactTest.id, commentTest.text)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await addCommentToChat(listTest.id, userTestNoExistsId, commentTest.text)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => addCommentToChat('', contactTest.id, commentTest.text)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => addCommentToChat(listTest.id, '', commentTest.text)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty comment text ', () =>
        expect(() => addCommentToChat(listTest.id, contactTest.id, '')).to.throw(Error, 'comment is empty')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})