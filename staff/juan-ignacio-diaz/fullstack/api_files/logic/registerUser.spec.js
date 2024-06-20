require('dotenv').config()

const { expect } = require('chai')
const { readFile, writeFile } = require('fs')

const registerUser = require('./registerUser')

const { generateUser, cleanUp, populate } = require('./helpers/tests')

describe('registerUser' , () =>{
    let userTest

    beforeEach(done => {
        userTest = generateUser().user

        cleanUp(done)
    })

    it('succeeds on new user', done => {
        registerUser(userTest.name, userTest.email, userTest.password, error => {
            expect(error).to.be.null
            
            readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
                expect(error).to.be.null

                const users =JSON.parse(json)

                const user =users.find(user => user.email === userTest.email)

                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(userTest.name)
                expect(user.email).to.equal(userTest.email)
                expect(user.password).to.equal(userTest.password)
                expect(user.avatar).to.be.null
                expect(user.favs).to.have.lengthOf(0)

                done()
            })
        })
    })

    it('succeeds on other existing user', done => {
        const { countId, user: userTest2 }  = generateUser()

        populate([userTest2], [], error => {
            expect(error).to.be.null

            registerUser(userTest.name, userTest.email, userTest.password, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)

                    const user = users.find(user => user.email === userTest.email)

                    expect(user).to.exist
                    expect(user.id).to.equal(`user-${countId + 1}`)
                    expect(user.name).to.equal(userTest.name)
                    expect(user.email).to.equal(userTest.email)
                    expect(user.password).to.equal(userTest.password)
                    expect(user.avatar).to.be.null
                    expect(user.favs).to.have.lengthOf(0)

                    done()
                })
            })
        })
    })

    it('fails on existing user', done => {
        populate([userTest], [], error => {
            expect(error).to.be.null

            registerUser(userTest.name, userTest.email, userTest.password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${userTest.email} already exists`)

                done()
            })
        })
    })

    it('fails on empty name', () => {
        expect(() => registerUser('', userTest.email, userTest.password, () => { })).to.throw(Error, 'name is empty')
    })

    it('fails on empty email', () =>
        expect(() => registerUser(userTest.name, '', userTest.password, () => { })).to.throw(Error, 'email is empty')
    )

    it('fails on non-string name', () => {
        expect(() => registerUser(undefined, userTest.email, userTest.password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser(1, userTest.email, userTest.password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser(true, userTest.email, userTest.password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser({}, userTest.email, userTest.password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser([], userTest.email, userTest.password, () => { })).to.throw(Error, 'name is not a string')
    })

    it('fails on non-string email', () => {
        expect(() => registerUser(userTest.name, undefined, userTest.password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(userTest.name, 1, userTest.password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(userTest.name, true, userTest.password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(userTest.name, {}, userTest.password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(userTest.name, [], userTest.password, () => { })).to.throw(Error, 'email is not a string')
    })


    after(cleanUp)
})