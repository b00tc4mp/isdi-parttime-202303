require('./testSetup.js')
const { User, Character, Mission } = require('../../data/models')
const registerCompletedMission = require('../registerCompletedMission.js')
const { cleanUp, populateUsers, populateCharacters, populateMissions, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError } = require('com/errors')

let user
let character
let mission

beforeEach(() => {
    user = generate.user()
    character = generate.character()
    mission = generate.mission()

    return cleanUp()
})

describe('registerCompletedMission Function', () => {
    it('succeeds on updating character completed mission list', async () => {
        const _characters = [character]
        const characters = await populateCharacters(_characters)
        const characterId = characters[0]._id.toString()

        user.character = characterId
        const _users = [user]
        const users = await populateUsers(_users)
        const userId = users[0]._id.toString()

        const _missions = [mission]
        const missions = await populateMissions(_missions)
        const missionId = missions[0]._id.toString()

        await registerCompletedMission(userId, missionId)

        const character2 = await Character.findOne({ _id: characterId })

        expect(character2).to.exist
        expect(character2._id.toString()).to.equal(characterId)
        expect(character2.missions).to.have.lengthOf(1)
        expect(character2.missions[0].toString()).to.equal(missionId)
    })
})