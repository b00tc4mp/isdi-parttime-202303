require('./testSetup.js')
const { Mission } = require('../../data/models')
const updateMission = require('../updateMission.js')
const { cleanUp, populateUsers, populateMissions, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError } = require('com/errors')

let user
let mission

beforeEach(() => {
    user = generate.user()

    mission = generate.mission()

    return cleanUp()
})

describe('updateMission Function', () => {
    it('succeeds on updating mission', async () => {
        const newImage = Math.random()
        const newTittle = `tittle-${Math.random()}`
        const newInfo = `info-${Math.random()}`
        const newLevel = `level-${Math.random()}`
        const newVisibility = false
        const newDifficulty = `difficulty-${Math.random()}`

        const _missions = [mission]
        const missions = await populateMissions(_missions)
        const missionId = missions[0]._id.toString()
        
        const _users = [user]
        const users = await populateUsers(_users)
        const userId = users[0]._id.toString()

        await updateMission(userId, missionId, newImage, newTittle, newInfo, newLevel, newDifficulty, newVisibility)

        const mission2 = await Mission.findOne({ _id: missionId })

        expect(mission2).to.exist
        expect(mission2._id.toString()).to.equal(missionId)
        expect(parseFloat(mission2.image)).to.not.equal(mission.image)
        expect(parseFloat(mission2.image)).to.equal(newImage)
        expect(mission2.tittle).to.not.equal(mission.tittle)
        expect(mission2.tittle).to.equal(newTittle)
        expect(mission2.info).to.not.equal(mission.info)
        expect(mission2.info).to.equal(newInfo)
        expect(mission2.level).to.not.equal(mission.level)
        expect(mission2.level).to.equal(newLevel)
        expect(mission2.difficulty).to.not.equal(mission.difficulty)
        expect(mission2.difficulty).to.equal(newDifficulty)
        expect(mission2.visibility).to.not.equal(mission.visibility)
        expect(mission2.visibility).to.equal(newVisibility)
    })

    it('fails on missing user', async () => {
        const randomId = '123a123b123c'

        const _missions = [mission]
        const missions = await populateMissions(_missions)
        const missionId = missions[0]._id.toString()

        try {
            await updateMission(randomId, missionId, mission.image, mission.tittle, mission.info, mission.level, mission.difficulty, mission.visibility)
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
            await updateMission(userId, randomId, mission.image, mission.tittle, mission.info, mission.level, mission.difficulty, mission.visibility)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`mission not found`)
        }
    })
})