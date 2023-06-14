require('dotenv').config()
const { expect } = require('chai')
const { writeFile, readFile, read } = require ('fs')
const updateUserPassword = require('./updateUserPassword.js')


describe('updateUserPassword', () => {
    let id, name, email, password, avatar, favs

    beforeEach(done => {
        writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error))
        
        id = `user-${Math.random()}`
        name = `name-${Math.random()}`
        email = `e-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        avatar =  null
        favs = []

    })

    it('succeeds on password updated', done => {
        const users = [{ id: id, name: name, email: email, password: password, avatar: avatar, favs: favs}]
        const json = JSON.stringify(users)

        writeFile(`${process.env.DB_PATH}/users.json`, json, 'utf8', error => {
            expect(error).to.be.null

            updateUserPassword(id, password,'123123123','123123123', (error => {
                readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
                    expect(error).to.be.null
                    const users = JSON.parse(json)
                    const user = users.find(user => user.email === email)
                    
                    expect(error).to.be.null
                    expect(user).to.exist
                    expect(user.password).to.equal('123123123')
    
                    done()
                
                })
            }))
        })
    })

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, '[]', 'utf8', error => done(error)))

})