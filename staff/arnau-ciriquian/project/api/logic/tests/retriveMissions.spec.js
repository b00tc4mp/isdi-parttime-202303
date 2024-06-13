require('./testSetup.js')
const retriveMissions = require('../retriveMissions.js')
const { cleanUp, populateUsers, populateMissions, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError } = require('com/errors')

let user

beforeEach(() => {
    user = generate.user()

    mission = generate.mission()

    return cleanUp()
})

describe('retriveMissions Function', () => {
    it('succeeds on retrieving missions, just one', async () => {
        const _missions = [mission]
        await populateMissions(_missions)
        
        const _users = [user]
        const users = await populateUsers(_users)
        const userId = users[0]._id.toString()

        const retrievedMission = await retriveMissions(userId)

        expect(retrievedMission).to.exist
        expect(retrievedMission).to.have.lengthOf(1)
    })

    it('succeeds on retrieving missions, more than one', async () => {
        const mission2 = generate.mission()

        const _missions = [mission, mission2]
        await populateMissions(_missions)
        
        const _users = [user]
        const users = await populateUsers(_users)
        const userId = users[0]._id.toString()

        const retrievedMission = await retriveMissions(userId)

        expect(retrievedMission).to.exist
        expect(retrievedMission).to.have.lengthOf(2)
    })

    it('succeeds on retrieving 0 missions', async () => {       
        const _users = [user]
        const users = await populateUsers(_users)
        const userId = users[0]._id.toString()

        const retrievedMission = await retriveMissions(userId)

        expect(retrievedMission).to.exist
        expect(retrievedMission).to.have.lengthOf(0)
    })

    it('fails on missing user', async () => {
        const randomId = '123a123b123c'

        try {
            await retriveMissions(randomId)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user not found`)
        }
    })
})