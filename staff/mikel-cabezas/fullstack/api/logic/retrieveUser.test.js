const retrieveUser = require( './retrieveUser' )
const authenticateUser = require('./authenticateUser')



    
        const userId = authenticateUser('mikelcabezas@gmail.com', '123123123', (error, userId) => {
            if(error) {
                console.error(error)
                
                return
            }
        
            console.log(userId)
            
            
        }) 
        retrieveUser(userId, (user, error) => {
            if(error) {
                console.error(error)
                
                return
            }
            console.log(user)
        })  


    // TODO Validate inputs

