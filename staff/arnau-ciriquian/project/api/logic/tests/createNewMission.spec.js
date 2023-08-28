require('./testSetup.js')
const { Mission } = require('../../data/models')
const createNewMission = require('../createNewMission.js')
const { cleanUp, populateUsers, populateMissions, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError } = require('com/errors')

let user
let mission
let date

beforeEach(() => {
    user = generate.user()

    mission = generate.mission()

    missionDate = new Date

    return cleanUp()
})

describe('createNewMission Function', () => {
    it('succeeds on creating a new mission', async () => {
        const _users = [user]
        const users = await populateUsers(_users)

        const userId = users[0]._id.toString()

        await createNewMission(userId, mission.image, mission.tittle, mission.info, mission.level, mission.difficulty, mission.visibility)

        const mission2 = await Mission.findOne({ image: mission.image })

        expect(mission2).to.exist
        expect(mission2.image).to.equal(mission.image)
        expect(mission2.tittle).to.equal(mission.tittle)
        expect(mission2.info).to.equal(mission.info)
        expect(mission2.level).to.equal(mission.level)
        expect(mission2.difficulty).to.equal(mission.difficulty)
        expect(mission2.visibility).to.equal(mission.visibility)
        expect(mission2.survivors).to.have.lengthOf(0)
    })

    it('fails on missing user', async () => {
        const randomId = '123a123b123c'
        try {
            await createNewMission(randomId, mission.image, mission.tittle, mission.info, mission.level, mission.difficulty, mission.visibility)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user not found`)
        }
    })
})