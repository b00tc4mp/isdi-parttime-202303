require('./testSetup.js')
const { User, Character } = require('../../data/models')
const updateCharacter = require('../updateCharacter.js')
const { cleanUp, populateUsers, populateCharacters, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError } = require('com/errors')

let user

beforeEach(() => {
    user = generate.user()

    character = generate.character()

    return cleanUp()
})

describe('updateCharacter Function', () => {
    it('succeeds on updating character', async () => {
        const newCharacterName = `name-${Math.random()}`
        const newAvatar = Math.random()

        const _characters = [character]
        const characters = await populateCharacters(_characters)
        const characterId = characters[0]._id.toString()
        
        user.character = characterId
        const _users = [user]
        const users = await populateUsers(_users)
        const userId = users[0]._id.toString()

        await updateCharacter(userId, newCharacterName, newAvatar)

        const character2 = await Character.findOne({ _id: characterId })

        expect(character2).to.exist
        expect(character2._id.toString()).to.equal(characterId)
        expect(character2.characterName).to.not.equal(character.characterName)
        expect(character2.characterName).to.equal(newCharacterName)
        expect(parseFloat(character2.avatar)).to.not.equal(character.avatar)
        expect(parseFloat(character2.avatar)).to.equal(newAvatar)
    })

    it('fails on missing user', async () => {
        const randomId = '123a123b123c'

        const _characters = [character]
        const characters = await populateCharacters(_characters)
        const characterId = characters[0]._id.toString()

        try {
            await updateCharacter(randomId, character.characterName, character.avatar)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user not found`)
        }
    })
})