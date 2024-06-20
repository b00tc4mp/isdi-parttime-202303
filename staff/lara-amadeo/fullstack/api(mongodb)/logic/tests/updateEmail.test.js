const updateEmail = require("./updateEmail")

updateEmail("user-1", "pepito@gmail.com", "pepito@grillo.com", error => {
    if(error){
        console.error(error)

        return
    }

    console.log("email updated!")
})