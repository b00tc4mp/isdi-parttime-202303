const updatePassword = require("./updatePassword")

updatePassword("user-1", "123123123", "Manzana12!", error => {
    if(error){
        console.error(error)

        return
    }

    console.log("password updated!")
})
