require('dotenv').config()

const { expect } = require('chai')
const createConversation = require('../createConversation')
const { cleanUp, generate, populate } = require('../helpers-test')
const mongoose = require('mongoose')
const { errors: { ExistenceError, ContentError } } = require('com')
const { User, Conversation } = require('../../data/models')

describe('createConversation', () => {
    let user, name, email

    before(async () => await mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        try {
            await cleanUp()

            user = generate.user()
            name = user.name
            email = user.email

            await populate(user, [])
        } catch (error) {
            
        }
    })

    it('succeeds on creating comment', async () => {
        try {
            const _user = await User.findOne({ email: user.email })
            const userId = _user._id.toString()

            const userInput = '¿Qué me puedes decir de Antonio Molina?'

            await createConversation(userId, userInput)

            const conversation = await Conversation.findOne({ author: userId })

            expect(conversation).to.exist

        } catch (error) {
            
        }
    })



    it('fails on non-existing user', async () => {
        try {
            const _user = await User.findOne({ email: user.email })

            const userInput = '¿Qué me puedes decir de Antonio Molina?'

            const wrongUserId = '6102a3cbf245ef001c9a1837'

            await createConversation(wrongUserId, userInput)

        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })

    it('fails on empty user id', () => expect(() => createConversation('', '6102a3cbf245ef001c9a1837', '¡Que post más interesante!')).to.throw(ContentError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', () => {
        const testUserInput = '¿Qué me puedes decir de Antonio Molina?'

        expect(() => createConversation(true, testUserInput)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createConversation([], testUserInput)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createConversation({}, testUserInput)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createConversation(undefined, testUserInput)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createConversation(1, testUserInput)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', () => expect(() => createConversation('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', '¡Que post más interesante!')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty user input', () => expect(() => createConversation('6102a3cbf245ef001c9a1837', '')).to.throw(ContentError, 'The user input field is empty.'))

    it('fails on a non-string user input', () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        
        expect(() => createConversation(testUserId, true)).to.throw(TypeError, 'The user input is not a string.')
        expect(() => createConversation(testUserId, [])).to.throw(TypeError, 'The user input is not a string.')
        expect(() => createConversation(testUserId, {})).to.throw(TypeError, 'The user input is not a string.')
        expect(() => createConversation(testUserId, undefined)).to.throw(TypeError, 'The user input is not a string.')
        expect(() => createConversation(testUserId, 1)).to.throw(TypeError, 'The user input is not a string.')
    })

    after(async () => await mongoose.disconnect())
})