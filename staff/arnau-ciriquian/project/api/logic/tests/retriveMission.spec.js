require('./testSetup.js')
const retriveMission = require('../retriveMission.js')
const { cleanUp, populateUsers, populateMissions, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError } = require('com/errors')

let user

beforeEach(() => {
    user = generate.user()

    mission = generate.mission()

    return cleanUp()
})

describe('retriveMission Function', () => {
    it('succeeds on retrieving mission info', async () => {
        const _missions = [mission]
        const missions = await populateMissions(_missions)
        const missionId = missions[0]._id.toString()
        
        const _users = [user]
        const users = await populateUsers(_users)
        const userId = users[0]._id.toString()

        const retrievedMission = await retriveMission(userId, missionId)

        expect(retrievedMission).to.exist
        expect(retrievedMission.tittle).to.equal(mission.tittle)
        expect(retrievedMission.image).to.equal(mission.image)
        expect(retrievedMission.info).to.equal(mission.info)
        expect(retrievedMission.level).to.equal(mission.level)
        expect(retrievedMission.difficulty).to.equal(mission.difficulty)
        expect(retrievedMission.visibility).to.equal(mission.visibility)
        expect(retrievedMission.survivors).to.have.lengthOf(0)

    })

    it('fails on missing user', async () => {
        const randomId = '123a123b123c'

        const _missions = [mission]
        const missions = await populateMissions(_missions)
        const missionId = missions[0]._id.toString()

        try {
            await retriveMission(randomId, missionId)
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
            await retriveMission(userId, randomId)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`mission not found`)
        }
    })
})