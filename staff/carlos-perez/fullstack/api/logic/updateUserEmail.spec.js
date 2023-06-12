const { expect } = require('chai')
const { writeFile, readFile} = require ('fs')
const updateUserEmail = require('./updateUserEmail.js')


describe('updateUserEmail', () => {
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

    it('succeeds on email updated', done => {
        const users = [{ id, name, email, password, avatar, favs}]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null

            updateUserEmail(id, email,'a@a.com','a@a.com', error => {
                expect(error).to.be.null
                readFile('./data/users.json', 'utf8', (error, json) => {
                    expect(error).to.be.null
                    const users = JSON.parse(json)
                    const user = users.find(user => user.id === id)
                    
                    expect(error).to.be.null
                    expect(user).to.exist
                    expect(user.email).to.equal('a@a.com')
    
                    done()
                
                })
            })
        })
    })

    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))

})