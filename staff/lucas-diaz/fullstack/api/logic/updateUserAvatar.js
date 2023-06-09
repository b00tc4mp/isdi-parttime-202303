const { readFile, writeFile } = require("fs")

module.exports = function updateUserAvatar(userId, avatar, callback) {
    // TODO validate imputs


    readFile("./data/users.json", "utf8", (error, json) => {
        if (error){
            callback(error)
            return
        }

        const users = JSON.parse(json)
        let foundUser = users.find(user => user.id === userId)

        if(!foundUser){
            callback(new Error("user not found"))
            return
        }

        foundUser.avatar = avatar;
        json = JSON.stringify(users, null, 4)

        writeFile("./data/users.json", json, "utf8", error => {
            if(error){
                callback(error)
                return
            }
            callback(null)
        })
    } )








/*     findUserById(authenticatedUserId, foundUser => {
        
        if (!foundUser){
            callback(new Error("user not found"));
            return;
        } 
    
        foundUser.avatar = avatarUrl;
        
        saveUser(foundUser, () => callback(null));
    }); */
}