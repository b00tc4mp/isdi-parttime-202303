const toggleSavePost = require('../toggleSavePost')

toggleSavePost("user-1", "post-2", error => {
    if(error){
        console.error(error)

        return
    }

    console.log("post saved or unsaved!")
})