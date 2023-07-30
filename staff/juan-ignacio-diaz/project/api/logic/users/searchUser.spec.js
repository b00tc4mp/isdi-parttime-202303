require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User } = require('../../data/models')

const searchUser = require('./searchUser')

const { generateUser, cleanUp, populateUser} = require('../helpers/tests')
debugger
describe('searchUser', () => {
    let userTest, userTest2

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        userTest2 = generateUser()

        await cleanUp()
        return await Promise.all([populateUser(userTest), populateUser(userTest2)])
    })

    it('succeeds on found email user', async () => {       
        const user = await searchUser(userTest.id, userTest2.email)
        expect(user.name).to.equal(userTest2.name)
        expect(user.avatar).to.equal(userTest2.avatar)
    })

    
    it('fails on not found email user', async () => {
        const userTestNoExistsEmail = 'not@email.com'

        try {
            return await searchUser(userTest.id, userTestNoExistsEmail)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('email not found')
        }
    })

    it('fails on not found user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await searchUser(userTestNoExistsId, userTest2.email)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty userId', () =>
        expect(() => searchUser('', userTest2.email)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty email', () =>
        expect(() => searchUser(userTest.id, '')).to.throw(Error, 'email is empty')
    )

    it('fails on invalid email', () =>
        expect(() => searchUser(userTest.id, 'invalidEmail')).to.throw(Error, 'the email is wrong')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})