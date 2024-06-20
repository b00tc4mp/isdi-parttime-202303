const updateUserPassword=require('./updateUserPassword')

updateUserPassword('user-1','123123123','1234','1234',error=>{
    if (error) {
        console.error(error)

        return
    }
})