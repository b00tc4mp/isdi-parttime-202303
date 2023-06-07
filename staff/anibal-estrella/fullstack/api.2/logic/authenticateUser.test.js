const { error } = require('console')
const authenticateUser = require('./authenticateUser')

authenticateUser('enki@gmail.com', '123123123', (error, userId) =>{
    if (error) {
        console.log(error);

        return
    }

    console.log(`user with id: \n${userId}\nSuccesfully authenticated! 👍`);
})