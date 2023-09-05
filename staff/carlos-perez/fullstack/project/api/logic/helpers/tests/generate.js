const bcrypt = require('bcryptjs');

module.exports = {
    Administrator: () => ({
        name: `name-${Math.random()}`,
        email: `email@provider.com`,
        password: bcrypt.hashSync('password', 10)
    }),

    Update: () => ({
        title: `text-${Math.random()}`,
        image: `http://www.image-${Math.random()}.com`,
        text: `text-${Math.random()}`,
        rsstext: `text-${Math.random()}`,
        date: new Date,
        visibility: true
    }),
    Event: () => ({
        title: `text-${Math.random()}`,
        eventDate: new Date,
        location: `text-${Math.random()}`,
        text: `text-${Math.random()}`,
        links: [`http://www.link-${Math.random()}.com`, `http://www.link-${Math.random()}.com`],
        date: new Date,
        visibility: true
    }),
    LyricPost: () => ({
        title: `text-${Math.random()}`,
        media: `http://www.media-${Math.random()}.com`,
        text: `text-${Math.random()}`,
        songInfo: `text-${Math.random()}`,
        date: new Date,
        visibility: true
    }),
    Message: () => ({
        email: `user-${Math.random()}@provider.com`,
        title: `text-${Math.random()}`,
        text: `text-${Math.random()}`,
        date: new Date,
        status: false
    }),
    UsersData: () => ({
        usersMail: `user-${Math.random()}@provider.com`
    })
}