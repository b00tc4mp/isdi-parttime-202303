const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser')

describe('registerUser', () => {
    let name, email, password


    beforeEach(done => {
        name = `name-${Math.round(Math.random() * 100)}`
        email = `Em${Math.round(Math.random() * 100)}@gmail.com`
        password = `Passw#${Math.round(Math.random() * 100)}`

        writeFile('./data/users.json', '[]', 'utf8', error => done(error))
    })

    it('should succeed on new user', done => {

        registerUser(name, email, password, error => {
            expect(error).to.be.null

            readFile('./data/users.json', 'utf8', (error, json) => {
                expect(error).to.be.null

                const users = JSON.parse(json)

                const user = users.find(user => user.email === email)

                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.avatar).to.be.null
                expect(user.favs).to.have.lengthOf(0)

                done()
            })
        })
    })


    it('should succeed on others existing user', done => {
        const idCount = Math.round(Math.random() * 100)
        const id2 = `user-${idCount}`
        const name2 = `name-${Math.round(Math.random() * 100)}`
        const email2 = `Em${Math.round(Math.random() * 100)}@gmail.com`
        const password2 = `Passw#${Math.round(Math.random() * 100)}`

        const users = [{ id: id2, name: name2, email: email2, password: password2 }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null

            registerUser(name, email, password, error => {
                expect(error).to.be.null

                readFile('./data/users.json', 'utf8', (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)

                    const user = users.find(user => user.email === email)

                    expect(user).to.exist
                    expect(user.id).to.be.equal(`user-${idCount + 1}`)
                    expect(user.name).to.equal(name)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                    expect(user.avatar).to.be.null
                    expect(user.favs).to.have.lengthOf(0)

                    done()
                })
            })
        })
    })
    it('should fail on existing user', done => {
        const users = [{ name, email, password }]
        const json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null


            registerUser(name, email, password, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`user with email ${email} already exist`)

                done()
            })
        })
    })

    it('fails on empty name', () =>
        expect(() => registerUser('', email, password, () => { })).to.throw(Error, 'name is empty')
    )
    it('fails on empty email', () =>
        expect(() => registerUser(name, '', password, () => { })).to.throw(Error, 'email is empty')
    )
    it('fails on non-string name', () => {
        expect(() => registerUser(undefined, email, password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser(1, email, password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser(true, email, password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser({}, email, password, () => { })).to.throw(Error, 'name is not a string')
        expect(() => registerUser([], email, password, () => { })).to.throw(Error, 'name is not a string')
    })

    it('fails on non-string email', () => {
        expect(() => registerUser(name, undefined, password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(name, 1, password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(name, true, password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(name, {}, password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => registerUser(name, [], password, () => { })).to.throw(Error, 'email is not a string')
    })

    it('fails on name lenght', () => {
        expect(() => registerUser('Jd', email, password, () => { })).to.throw(Error, 'name minimun 3 characters')
        expect(() => registerUser('acb123456789012345', email, password, () => { })).to.throw(Error, 'name maximun 15 characters')

    })
    //TODO other validators situations

    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))

})


