module.exports = {
    user: () => ({
        id : `user-${Math.random()}`,
        name : `name-${Math.random()}`,
        email : `e-${Math.random()}@mail.com`,
        password : `password-${Math.random()}`,
        avatar :  null,
        favs : [],
    }),

    post: userId => ({
        id: `post-${Math.random()}`,
        author: userId,
        image: `image-${Math.random()}`,
        location : `location-${Math.random()}`,
        title : `title-${Math.random()}`,
        text: `text-${Math.random()}`,
        date: new Date,
        likes: [],
    })
}