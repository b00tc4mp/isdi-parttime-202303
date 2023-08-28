require('./testSetup.js')
const getUserCharacter = require('../getUserCharacter.js')
const { cleanUp, populateUsers, populateCharacters, generate } = require('../helpers-tests')
const { expect } = require('chai')
const { ExistenceError } = require('com/errors')

let user

beforeEach(() => {
    user = generate.user()

    character = generate.character()

    return cleanUp()
})

describe('getUserCharacter Function', () => {
    it('succeeds on retrieving logged user character info', async () => {
        const _characters = [character]
        const characters = await populateCharacters(_characters)
        const characterId = characters[0]._id.toString()
        user.character = characterId        
        
        const _users = [user]
        const users = await populateUsers(_users)
        const userId = users[0]._id.toString()

        const retrievedCharacter = await getUserCharacter(userId)

        expect(retrievedCharacter).to.exist
        expect(retrievedCharacter._id).to.be.undefined
        expect(retrievedCharacter.characterName).to.equal(character.characterName)
        expect(retrievedCharacter.avatar).to.equal(character.avatar)
        expect(retrievedCharacter.missions).to.have.lengthOf(0)
        expect(retrievedCharacter.level).to.equal(1)
    })

    it('fails on missing user', async () => {
        const randomId = '123a123b123c'

        const _characters = [character]
        const characters = await populateCharacters(_characters)
        const characterId = characters[0]._id.toString()

        try {
            await getUserCharacter(randomId, characterId)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`user not found`)
        }
    })

    it('fails on missing character', async () => {
        const randomId = '123a123b123c'

        const _users = [user]
        const users = await populateUsers(_users)
        const userId = users[0]._id.toString()

        try {
            await getUserCharacter(userId, randomId)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`character not found`)
        }
    })
})