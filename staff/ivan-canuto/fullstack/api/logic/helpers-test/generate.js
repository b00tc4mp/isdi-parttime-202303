module.exports = {
    user: () => ({
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}`,
        password: `password-${Math.random()}`,
        avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKC',
        favs: []
    }),

    post: userId => ({
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