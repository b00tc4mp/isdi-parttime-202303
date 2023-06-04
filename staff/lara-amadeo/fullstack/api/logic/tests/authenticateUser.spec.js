const { expect } = require('chai')
const { readFile } = require('fs')
const authenticateUser = require('./authenticateUser')

describe('authenticateUser', () => {

    it('should log in the user succesfully', done => {

        authenticateUser('pepito@grillo.com', 'Manzana12!', (error, userId) => {
            expect(error).to.be.null

            readFile('./data/users.json', (error, json) => {
                done(error)

                const users = JSON.parse(json)
    
                const user = users.find(user => user.email === 'pepito@grillo.com')
    
                expect(user.email).to.equal('pepito@grillo.com')
                expect(user.password).to.equal('Manzana12!')
                expect(userId).to.equal(user.id)
            })

        })
    })

    it('should fail on wrong email', done => {

        authenticateUser('pepito@gillo.com', 'Manzana12!', (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`User with email ${'pepito@gillo.com'} not found`)

            readFile('./data/users.json', (error, json) => {
                done(error)

                const users = JSON.parse(json)
    
                const user = users.includes(user => user.email === 'pepito@gillo.com')
    
                expect(user).to.be.false
                expect(userId).to.be.undefined
            })

        })

    })

    it('should fail on wrong password', done => {

        authenticateUser('pepito@grillo.com', 'Manzna12!', (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('Email or password incorrect')

            readFile('./data/users.json', (error, json) => {
                done(error)

                const users = JSON.parse(json)
    
                const user = users.includes(user => user.email === 'pepito@gillo.com')
    
                expect(user).to.be.false

                expect(userId).to.be.undefined
            })

        })

    })
})