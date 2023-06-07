const usersList = [
    {
        "id": "user-1",
        "name": "Arnau",
        "email": "arnau@ciriquian.com",
        "password": "Arnau1",
        "avatar": "/images/PunIntendedLike.png",
        "favs": []
    },
    {
        "id": "user-2",
        "name": "Ona",
        "email": "ona@ciriquian.com",
        "password": "Ona1",
        "avatar": "/images/PunIntendedLike.png",
        "favs": ["post-1", "post-2", "post-4", "post-6"]
    },
    {
        "id": "user-3",
        "name": "Anna",
        "email": "anna@renau.com",
        "password": "Anna1",
        "avatar": "/images/PunIntendedLike.png",
        "favs": []
    }
]

localStorage.usersJson = JSON.stringify(usersList)

const postsList = [
    {
        "id": "post-1",
        "author": "user-1",
        "image": "https://picsum.photos/600/400",
        "text": "A1",
        "date": "21/05/2023",
        "likes": [],
        "hidden": false
    },
    {
        "id": "post-2",
        "author": "user-1",
        "image": "https://picsum.photos/600/400",
        "text": "A2",
        "date": "21/05/2023",
        "likes": [],
        "hidden": false
    },
    {
        "id": "post-3",
        "author": "user-2",
        "image": "https://picsum.photos/600/400",
        "text": "O1",
        "date": "21/05/2023",
        "likes": [],
        "hidden": false
    },
    {
        "id": "post-4",
        "author": "user-2",
        "image": "https://picsum.photos/600/400",
        "text": "O2",
        "date": "21/05/2023",
        "likes": [],
        "hidden": false
    },
    {
        "id": "post-5",
        "author": "user-3",
        "image": "https://picsum.photos/600/400",
        "text": "N1",
        "date": "21/05/2023",
        "likes": [],
        "hidden": false
    },
    {
        "id": "post-6",
        "author": "user-3",
        "image": "https://picsum.photos/600/400",
        "text": "N2\n",
        "date": "21/05/2023",
        "likes": [],
        "hidden": false
    }
]

localStorage.postsJson = JSON.stringify(postsList)