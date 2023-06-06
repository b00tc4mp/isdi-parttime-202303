const { expect } = require('chai')
const { writeFile, readFile } = require ('fs')
const retrieveUser = require('./retrieveUser.js')


describe('retrieveUser', () => {
    let id, name, email, password, avatar, favs

    beforeEach(done => {
        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
        
        id = `user-${Math.random()}`
        name = `name-${Math.random()}`
        email = `e-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        avatar =  null
        favs = []

    })

    it('succeeds on retrieving user', done => {
        const users = [{ id: id, name: name, email: email, password: password, avatar: avatar, favs: favs}]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null

            retrieveUser(id, (error, user) => {
                expect(error).to.be.null
                
                readFile('./data/users.json', 'utf8', error => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)
                    const user = users.find(user => user.id === id)

                    expect(user).to.exist
                    expect(id).to.equal(user.id)

                    done()

                })
            })
        })
    })

    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))

})