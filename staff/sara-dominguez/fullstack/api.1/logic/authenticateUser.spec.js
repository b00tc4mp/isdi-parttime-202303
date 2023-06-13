
const { expect } = require('chai')
const { writeFile } = require('fs')
const authenticateUser = require('./authenticateUser.js')

describe('authenticateUser', () => {
    let id, email, password

    beforeEach(done => {
        id = `id-${Math.round(Math.random() * 100)}`
        email = `e-${Math.random()}@mail.com`
        password = `Passw-${Math.round(Math.random()) * 10}`

        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
    })

    it('should succeed on existing user', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null


            authenticateUser(email, password, (error, userId) => {
                expect(error).to.be.null
                expect(userId).to.equal(id)

                done()
            })
        })
    })

    it('fail on non existing user', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        authenticateUser(email, password, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`user with email ${email} not found`)
            expect(userId).to.be.undefined

            done()
        })
    })

    it('fails on existing user but wrong password', done => {
        const users = [{ id, email, password }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null
        })

        authenticateUser(email, password + '-', (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('wrong credentials')
            expect(userId).to.be.undefined

            done()
        })
    })

    it('fails on empty email', () =>
        expect(() => authenticateUser('', password, () => { })).to.throw(Error, 'email is empty')
    )

    it('fails on empty password', () =>
        expect(() => authenticateUser(email, '', () => { })).to.throw(Error, 'password is empty')
    )

    after(done => writeFile('./data/users.json', '[]', "utf8", error => done(error)))
})
