const { expect } = require('chai')
const { readFile, writeFile } = require('fs')
const registerUser = require('./registerUser')

describe('registerUser', () => {
    beforeEach(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))

    it('should succeed on new user', done => {
        registerUser('Coco Drilo', 'coco@drilo.com', '123123123', error => {
            expect(error).to.be.null
            
            readFile('./data/users.json', 'utf8', (error, json) => {
                expect(error).to.be.null

                const users = JSON.parse(json)

                const user = users.find(user => user.email === 'coco@drilo.com')

                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal('Coco Drilo')
                expect(user.email).to.equal('coco@drilo.com')
                expect(user.password).to.equal('123123123')
                expect(user.avatar).to.be.null
                expect(user.favs).to.have.lengthOf(0)

                done()
            })
        })
    })
    
    after(done => writeFile('./data/users.json', '[]', 'utf8', error => done(error)))
})