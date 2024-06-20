const createPost = require('../createPost')

createPost('user-1', 'https://images.squarespace-cdn.com/content/v1/51da4775e4b0108eefe2ecdf/1578878777700-T4Y7PJ1ZY5G81MNZHOIV/Emmazed_21.jpg?format=1000w', 'hello test', error => {
    if(error){
        console.error(error)
        return
    }
    console.log('post created!')
})