const { expect } = require('chai')
const registerUser = require('./registerUser.js');
const { readFile } = require('fs')

describe('authenticateUser', () => {
    it('should return a user object', () => {
        registerUser('Mikel C.', 'heads@gmail.com', '123123123', error => {
            expect(error).to.be.null
            
            readFile('./data/users.json', 'utf8', (error, json) => {
                expect(error).to.be.null
                
                const users = JSON.parse(json)

                const user = users.find(user => user.email === 'heads@gmail.com')

                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal('Mikel C.')
                expect(user.email).to.equal('heads@gmail.com')
                expect(user.password).to.equal('123123123')
                expect(user.avatar).to.be.null
                expect(user.favPosts).to.have.lengthOf(0)
            })
        }) 
    })
    })



