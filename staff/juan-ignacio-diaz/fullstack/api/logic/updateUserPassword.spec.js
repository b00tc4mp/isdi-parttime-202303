require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { User } = require('../data/models')

const updateUserPassword = require('./updateUserPassword')

const { generateUser, cleanUp, populateUser } = require('./helpers/tests')

describe('updateUserPassword', () => {
    let userTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(() => {
        userTest = generateUser()

        return cleanUp()
            .then(() => populateUser(userTest))
    })

    it('succeeds on existing user and correct id', () => {
        const newPassword = userTest.password + '-new'

        return updateUserPassword(userTest.id, userTest.password, newPassword, newPassword)
            .then(() => User.findById(userTest.id))
            .then(user => expect(user.password).to.equal(newPassword))
    })

    it('fails on existing user but incorrect id', () => {
        const newPassword = userTest.password + '-new'
        const userTestNoExistsId = '000000000000000000000000'

        return updateUserPassword(userTestNoExistsId, userTest.password, newPassword, newPassword)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('user not found')
            })
    })

    it('fails on existing user but invalid password', () => {
        const invalidPassword = userTest.password + '-invalid'
        const newPassword = userTest.password + '-new'

        return updateUserPassword(userTest.id, invalidPassword, newPassword, newPassword)
            .catch(error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`Error the pasword is invalid`)
            })        
    })

    it('fails on existing user but incorrect password', () => {
        const wrongPassword = 'sort'
        const newPassword = userTest.password + '-new'

        expect(() => updateUserPassword(userTest.id, wrongPassword, newPassword, newPassword)).to.throw(Error, `password length lower than 8 characters`)
        expect(() => updateUserPassword(userTest.id, '', newPassword, newPassword)).to.throw(Error, `password length lower than 8 characters`)
    })

    it('fails on existing user but incorrect new password', () => {
        const wrongNewPassword = 'sort'
        const newPassword = userTest.password + '-new'

        expect(() => updateUserPassword(userTest.id, userTest.password, wrongNewPassword, newPassword)).to.throw(Error, `new password length lower than 8 characters`)
        expect(() => updateUserPassword(userTest.id, userTest.password, '', newPassword)).to.throw(Error, `new password length lower than 8 characters`)
    })

    after(() => cleanUp()
            .then(() => mongoose.disconnect())
    )
})