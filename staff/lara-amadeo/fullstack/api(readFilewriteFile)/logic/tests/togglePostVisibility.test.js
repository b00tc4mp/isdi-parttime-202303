const togglePostVisibility = require('../togglePostVisibility')

togglePostVisibility("user-1", "post-1", error => {
    if(error){
        console.error(error)

        return
    }

    console.log("post visibility changed!")
})