require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User } = require('../../data/models')

const retrieveUserContacts = require('./retrieveUserContacts')

const { generateUser, cleanUp, populateUser} = require('../helpers/tests')

describe('retrieveUserContacts', () => {
    let userTest, contactTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
        contactTest = generateUser()

        await cleanUp()
        await Promise.all([populateUser(userTest), populateUser(contactTest)])
        
        userTest.contacts.push(contactTest.id)
        return User.findByIdAndUpdate(userTest.id, { $push: { contacts: contactTest.id }})
    })

    it('succeeds on existing user and correct id user and id contact', async () => {       
        const contacts = await retrieveUserContacts(userTest.id)

        const user = await User.findById(userTest.id)
        expect(user.name).to.equal(userTest.name)

        expect(contacts).to.have.lengthOf(1)
        expect(contacts[0].name).to.equal(contactTest.name)
    })

    it('fails on existing user and incorrect id', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await retrieveUserContacts(userTestNoExistsId)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty userId', () =>
        expect(() => retrieveUserContacts('', contactTest.id)).to.throw(Error, 'user id does not have 24 characters')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )
})