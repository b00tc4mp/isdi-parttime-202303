const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser')
const { afterEach } = require('node:test')


describe('registerUser', () => {
    beforeEach(done => {
        // clean test start with an empty DB in an async process "done" callback
        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
    })
    //after done start test

    it('should succeed when new user is registered', done => {


        // registerUser('Eli Carné', "eli@gmail.com", '123123123', error => {
        // registerUser('enki estrella', "enki@gmail.com", '123123123', error => {
        registerUser('anibal estrella', "anibal@gmail.com", '123123123', error => {
            expect(error).to.be.null
            readFile('./data/users.json', 'utf-8', (error, json) => {
                expect(error).to.be.null

                const users = JSON.parse(json)

                const user = users.find(user => user.email === "anibal@gmail.com")

                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal('anibal estrella')
                expect(user.email).to.equal('anibal@gmail.com')
                expect(user.password).to.equal('123123123')
                expect(user.avatar).to.be.null
                expect(user.favs).to.have.lengthOf(0)
                
                // test finnishes
                done()
            })

        })

    })
    
    //clean after test

    afterEach(done => {
        // clean test start with an empty DB in an async process "done" callback
        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
    })
    
})
// to run the test run "node logic/registerUser.js"