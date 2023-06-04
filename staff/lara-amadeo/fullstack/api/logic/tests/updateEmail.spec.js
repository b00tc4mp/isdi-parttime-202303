const { expect } = require('chai')
const updateEmail = require('./updateEmail')
const randomNumFromInterval = require('./helpers/randoms')
const { readFile } = require('fs')

describe('updateEmail', () => {
    let num
    let user
    beforeEach(done => {
        readFile('./data/users.json', (error, json) => {
            if(error) done(error)

            const users = JSON.parse(json)

            num = randomNumFromInterval(1,5)
            user = users.find(user => user.id === `user-${num}`)
            done()
        })
    })

    it('should change the user email for the given one', done => {
        const newEmail = `${Math.random()}@email.com`
        updateEmail(user.id, user.email, newEmail, error => {
            expect(error).to.be.null

            readFile('./data/users.json', 'utf-8', (error, json) => {
                expect(error).to.be.null

                const users = JSON.parse(json)

                const foundUser = users.find(_user => _user.id === user.id)

                expect(foundUser).to.exist
                expect(foundUser.email).to.equal(newEmail)

                done()
            })
        })
    })
})