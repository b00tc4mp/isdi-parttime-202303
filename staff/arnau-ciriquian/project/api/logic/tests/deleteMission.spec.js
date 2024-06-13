require('./testSetup.js')
const { Mission } = require('../../data/models')
const deleteMission = require('../deleteMission.js')
const { cleanUp, populateUsers, populateMissions, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError } = require('com/errors')

let user

beforeEach(() => {
    user = generate.user()

    mission = generate.mission()

    return cleanUp()
})

describe('deleteMission Function', () => {
    it('succeeds on deleting mission', async () => {
        const _users = [user]
        const users = await populateUsers(_users)
        const userId = users[0]._id.toString()

        const _missions = [mission]
        const missions = await populateMissions(_missions)
        const missionId = missions[0]._id.toString()

        await deleteMission(userId, missionId)

        const mission2 = await Mission.findOne({ _id: missionId })

        expect(mission2).to.be.null
    })

    it('fails on missing user', async () => {
        const randomId = '123a123b123c'

        const _missions = [mission]
        const missions = await populateMissions(_missions)
        const missionId = missions[0]._id.toString()

        try {
            await deleteMission(randomId, missionId)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user not found`)
        }
    })

    it('fails on missing mission', async () => {
        const randomId = '123a123b123c'

        const _users = [user]
        const users = await populateUsers(_users)
        const userId = users[0]._id.toString()

        try {
            await deleteMission(userId, randomId)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`mission not found`)
        }
    })
})