const updateAvatar = require("./updateAvatar")

updateAvatar("user-1", "https://images.squarespace-cdn.com/content/v1/51da4775e4b0108eefe2ecdf/1597899060161-379FWM7V6RDR05VZFVVG/INTRO.jpg?format=2500w", error => {
    if(error){
        console.error(error)

        return
    }

    console.log("avatar updated!")
})