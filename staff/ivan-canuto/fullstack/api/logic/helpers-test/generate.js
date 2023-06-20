module.exports = {
    user: () => ({
        id: `user-${Math.random()}`,
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}`,
        password: `password-${Math.random()}`,
        avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKC',
        favs: []
    }),

    post: userId => ({
        id: `post-1`,
        author: userId,
        image: `image-${Math.random()}.jpg`,
        text: `text-${Math.random()}`,
        date: new Date().toLocaleDateString(),
        likes: [],
        visible: true,
        onSale: null,
        comments: []
    })
}