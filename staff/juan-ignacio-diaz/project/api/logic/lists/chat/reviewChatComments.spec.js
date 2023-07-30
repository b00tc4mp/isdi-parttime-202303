require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User, List } = require('../../../data/models')

const reviewChatComments = require('./reviewChatComments')

const { generateUser, generateList, generateComment, cleanUp, populateUser, populateList, populateComment } = require('../../helpers/tests')
debugger
describe('reviewChatComments', () =>{
    let userTest, contactTest, listTest, commentTest, commentTest2

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        contactTest = generateUser()

        await cleanUp()
        await Promise.all([populateUser(userTest), populateUser(contactTest)])
        await User.findByIdAndUpdate(userTest.id,  { $push: { contacts: [contactTest.id] } }) 

        listTest = generateList(userTest.id)
        commentTest = generateComment(userTest.id)
        commentTest2 = generateComment(contactTest.id)

        await populateList(listTest)
        await List.findByIdAndUpdate(listTest.id,  { $push: { users: [contactTest.id] } }) 
        
        await populateComment(listTest.id, commentTest)
        return await populateComment(listTest.id, commentTest2)
    })

    it('succeeds on retrieve comments', async () => {
        const comments = await reviewChatComments(listTest.id, userTest.id)
        expect(comments).to.have.length(2)
        const comment = comments[0]
        expect(comment.text).to.equal(commentTest2.text)
    })

    it('fails on existing list', async () => {
        const listTestNoExistsId = '000000000000000000000000'

        try {
            return await reviewChatComments(listTestNoExistsId, userTest.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('list not found')
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await reviewChatComments(listTest.id, userTestNoExistsId)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty listId', () => 
        expect(() => reviewChatComments('', userTest.id)).to.throw(Error, 'list id does not have 24 characters')
    )

    it('fails on empty userId', () =>
        expect(() => reviewChatComments(listTest.id, '')).to.throw(Error, 'user id does not have 24 characters')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})