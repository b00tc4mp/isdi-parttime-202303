require('dotenv').config()

const { expect } = require('chai')

const mongoose = require('mongoose')
const { List } = require('../../data/models')

const createList = require('./createList')

const { generateUser, generateList, cleanUp, populateUser, populateList } = require('../helpers/tests')

describe('createList', () =>{
    let userTest, listTest

    before(() => mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        userTest = generateUser()
     
        await cleanUp()
        await populateUser(userTest)
        return listTest = generateList(userTest.id)
    })

    it('succeeds on new list', async () => {
        await createList(userTest.id, listTest.name, listTest.dateToEnd)
        const lists = await List.find({})
        expect(lists).to.have.length(1)
        const list = lists[0]
        expect(list).to.exist
        expect(list.id).to.be.a('string')
        expect(list.dateToEnd).to.deep.equal(listTest.dateToEnd)
        expect(new Date(list.date)).to.be.a('date')
        expect(list.guests).to.have.lengthOf(1)
        expect(list.guests[0].toString()).to.equal(userTest.id)
        expect(list.invited).to.have.lengthOf(0)
    })

    it('fails when list already exist', async () => {
        await populateList(listTest) 

        try {
            return await createList(userTest.id, listTest.name, listTest.dateToEnd)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`list with name ${listTest.name} already exists`)
        }
    })

    it('fails on existing user', async () => {
        const userTestNoExistsId = '000000000000000000000000'

        try {
            return await createList(userTestNoExistsId, listTest.name, listTest.dateToEnd)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
        }
    })

    it('fails on empty userId', () => 
        expect(() => createList('', listTest.name, listTest.dateToEnd)).to.throw(Error, 'user id does not have 24 characters')
    )

    it('fails on empty name', () =>
        expect(() => createList(userTest.id, '', listTest.dateToEnd)).to.throw(Error, 'name is empty')
    )

    it('fails on empty dateToEnd', () =>
        expect(() => createList(userTest.id, listTest.name, '')).to.throw(Error, 'Date is not valid')
    )

    after(() => 
        cleanUp()
            .then(() => mongoose.disconnect())
    )

})