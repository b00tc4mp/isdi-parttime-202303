require('dotenv').config() //a cada test

// canviar tots els paths -> "./data/users.json" o "./data/posts.json" a `${process.env.DB_PATH}/users.json` o `${process.env.DB_PATH}/posts.json`

const { expect } = require("chai")
const { readFile } = require("fs")
const registerUser = require("../registerUser")

describe('registerUser', () => {
    it('should succed on new user', () => {
        registerUser('Ona', 'ona@ciriquian.com', 'Ona1', error => {
            expect(error).to.be.null

            readFile(`${process.env.DB_PATH}/users.json`, 'utf8', (error, json) => {
                expect(error).to.be.null

                const users = JSON.parse(json)

                const user = users.find(user => user.email === 'ona@ciriquian.com')

                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal('Ona')
                expect(user.email).to.equal('ona@ciriquian.com')
                expect(user.password).to.equal('Ona1')
                expect(user.avatar).to.be.null
                expect(user.favs).to.have.lengthOf(0)
            })
        })
    })
})