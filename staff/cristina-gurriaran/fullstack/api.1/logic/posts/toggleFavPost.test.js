const toggleFavPost = require("./toggleFavPost");

toggleFavPost('user-1','post-1', error => {
    if(error){
        console.error(error)
        return
    }

    console.log('toggled fav post')
})