require('./testSetup.js')
const { User, Character } = require('../../data/models')
const createNewCharacter = require('../createNewCharacter.js')
const { cleanUp, populateUsers, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError } = require('com/errors')


let user
let character
let date

beforeEach(() => {
    user = generate.user()

    character = generate.character()

    date = new Date

    return cleanUp()
})

describe('createNewCharacter Function', () => {
    it('succeeds on creating a new character for a user', async () => {
        const _users = [user]
        const users = await populateUsers(_users)

        const userId = users[0]._id.toString()

        await createNewCharacter(userId, character.characterName, character.avatar)

        const user2 = await User.findOne({ email: user.email })

        const character2 = await Character.findOne({ _id: user2.character })

        expect(character2).to.exist
        expect(character2._id.toString()).to.equal(user2.character)
        expect(character2.characterName).to.equal(character.characterName)
        expect(character2.avatar).to.equal(character.avatar)
        expect(character2.level).to.equal(1)
        expect(character2.missions).to.have.lengthOf(0)
    })

    it('fails on missing user', async () => {
        const randomId = '123a123b123c'
        try {
            await createNewCharacter(randomId, character.characterName, character.avatar)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user not found`)
        }
    })
})