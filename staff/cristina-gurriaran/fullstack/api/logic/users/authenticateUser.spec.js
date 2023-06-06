const { expect } = require('chai')
const { writeFile } = require ('fs')
const authenticateUser = require('./authenticateUser')

describe('authenticateUser', () => {
    let id, email, password

    beforeEach(done => {
        writeFile('./data/users.json', '[]', 'utf8', error => done(error))

        id = `user-${Math.random()}`
        email = `e-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

    })

    it('should succeed on existing user' , done => {
        const user = [{id, email, password}]
        const json = JSON.stringify(user)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null

            authenticateUser(email, password, (error, userId) => {
                expect(error).to.be.null
                expect(userId).to.equal(id)

                done()
            })
        })
    })

    it('should fail on non-existing user', done => {
        const user = [{id, email, password}]
        const json = JSON.stringify(user)

        authenticateUser(email, password, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('user not found')
            expect(userId).to.be.undefined

            done()
        })
    })
    
    
    it('should fail on wrong password', done => {
        const user = [{id, email, password}]
        const json = JSON.stringify(user)

        writeFile('./data/users.json', json, 'utf8', error => {
            expect(error).to.be.null
            
            const wrongPassword = `password-${Math.random()}`
    
            authenticateUser(email, wrongPassword, (error, userId) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('wrong password')
    
                done()
            })
        })
    })

    it('should fail on empty email', () => 
        expect(() => authenticateUser('', password, () => { })).to.throw(Error, 'email is empty')
    )

    it('should fail on non-string name', () => {
        expect(() => authenticateUser(1, password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => authenticateUser(undefined, password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => authenticateUser(true, password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => authenticateUser([], password, () => { })).to.throw(Error, 'email is not a string')
        expect(() => authenticateUser({}, password, () => { })).to.throw(Error, 'email is not a string')

    })

    it('should fail on empty password', () => 
    expect(() => authenticateUser(email, '', () => { })).to.throw(Error, 'password has less than 8 characters')
    )

    it('should fail on non-string password', () => {
        expect(() => authenticateUser(email, 1, () => { })).to.throw(Error, 'password is not a string')
        expect(() => authenticateUser(email, undefined, () => { })).to.throw(Error, 'password is not a string')
        expect(() => authenticateUser(email, true, () => { })).to.throw(Error, 'password is not a string')
        expect(() => authenticateUser(email, [], () => { })).to.throw(Error, 'password is not a string')
        expect(() => authenticateUser(email, {}, () => { })).to.throw(Error, 'password is not a string')
    })

    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))

})



