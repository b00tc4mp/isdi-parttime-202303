const { expect } = require('chai')
const authenticateUser = require('./authenticateUser')

describe('authenticateUser', () => {
    it('should return a user object', () => {
        authenticateUser('norah@gmail.com', '123123123', (error, userId) => {
            if(error) {
                console.error(error)
                
                return
            }
            console.log(userId)
        }) 
    })
    })
