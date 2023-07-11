const sellPost = require('../sellPost')

const price = Math.floor(Math.random() * 100)
sellPost("user-1", "post-1", price, error => {
    if(error){
        console.error(error)

        return
    }

    console.log(`post on sale for just ${price}!`)
})