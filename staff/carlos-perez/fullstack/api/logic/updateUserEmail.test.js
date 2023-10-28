const updateUserEmail=require('./updateUserEmail')

updateUserEmail('user-1','a@a.com','pepito@grillo.com','pepito@grillo.com',error=>{
    if (error) {
        console.error(error)

        return
    }
})