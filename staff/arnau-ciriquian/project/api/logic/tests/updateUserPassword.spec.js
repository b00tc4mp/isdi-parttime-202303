require('./testSetup.js')
const { User } = require('../../data/models')
const updateUserPassword = require('../updateUserPassword.js')
const { cleanUp, populate, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError, DuplicityError, AuthError, ContentError } = require('com/errors')

let user

beforeEach(() => {
    user = generate.user()

    return cleanUp()
})

describe('updateUsePassword Function', () => {
    it('succeeds on updating password', async () => {
        const _users = [user]
        const newPassword = `newPassword-${Math.random()}`
        const newPasswordConfirmation = newPassword
        
        const users = await populate(_users)
        const userId = users[0]._id.toString()

        await updateUserPassword(userId, user.password, newPassword, newPasswordConfirmation)
        
        const user2 = await User.findOne({ _id: userId })

        expect(user2.password).to.equal(newPassword)
    })

    it('fails on missing user', async () => {
        const newPassword = `newPassword-${Math.random()}`
        const newPasswordConfirmation = newPassword
        const randomId = '123a123b123c'

        try {
            await updateUserPassword(randomId, user.password, newPassword, newPasswordConfirmation)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user not found`)
        }
    })

    it('fails on new password being equal to old password', async () => {
        const _users = [user]
        const newPassword = user.password
        const newPasswordConfirmation = newPassword

        const users = await populate(_users)
        const userId = users[0]._id.toString()

        try {
            await updateUserPassword(userId, user.password, newPassword, newPasswordConfirmation)
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('new password is the same as old password')
        }
    })

    it('fails on wrong password', async () => {
        const wrongPassword = `${user.password}1`
        const newPassword = `newPassword-${Math.random()}`
        const newPasswordConfirmation = newPassword

        const _users = [user]
        const users = await populate(_users)
        const userId = users[0]._id.toString()

        try {
            await updateUserPassword(userId, wrongPassword, newPassword, newPasswordConfirmation)
            expect(userId).to.be.undefined
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal(`password is not correct`)
        }
    })

    it('fails on new password confirmation not being equal to new password', async () => {
        const _users = [user]
        const newPassword = user.password
        const newPasswordConfirmation = `${newPassword}1`

        const users = await populate(_users)
        const userId = users[0]._id.toString()

        try {
            await updateUserPassword(userId, user.password, newPassword, newPasswordConfirmation)
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('new password confirmation is different than new password')
        }
    })
})