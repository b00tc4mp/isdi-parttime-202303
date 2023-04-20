export const posts = 'postsJson' in localStorage ? JSON.parse(localStorage.postsJson) : []
export const favorites = 'favoritesJson' in localStorage ? JSON.parse(localStorage.favoritesJson) :  []

if(posts.length === 0) {
    posts.push({
        id: '6a535fe1-db76-4430-004b-de2cac090610',
        author: 'fabefe75-f2c6-44e0-0c6f-6049623491c4',
        text: 'Doing some calibrations',
        image: 'https://static.wikia.nocookie.net/masseffect/images/e/e1/Normandy_Render.png',
        date: new Date('April 3, 2023 12:15:30'),
        edited: [],
        likes: ['fabefe75-f2c6-44e0-0c6f-6049623491c4'],
    });
    
    posts.push({
        id: '44c67b3a-4272-4866-07c2-48d4e48d890d',
        author: 'fabefe75-f2c6-44e0-0c6f-6049623491c4',
        text: `A Quarantine Zone For A Plague That Kills Turians. Why Don't We Ever Go Anywhere Nice?`,
        image: 'https://static.wikia.nocookie.net/masseffect/images/e/ec/Codex_Omega.png',
        date: new Date('April 8, 2023 12:15:30'),
        edited: [],
        likes: [],
    });
    
    posts.push({
        id: 'b6208d89-a811-4275-04fc-d2b804d802ad',
        author: '1e53f274-0d45-467d-1986d-4c3d7a1c5827',
        text: 'Shepaaaaaaaaaaaaaard',
        image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mass-effect-3/f/f2/Normandy_First_Visit_slice11.png',
        date: new Date('April 6, 2023 12:15:30'),
        edited: [],
        likes: ['fabefe75-f2c6-44e0-0c6f-6049623491c4'],
    });
}

if(favorites.length === 0) {
    favorites.push({
        postId: '6a535fe1-db76-4430-004b-de2cac090610',
        usersId: ['fabefe75-f2c6-44e0-0c6f-6049623491c4',]
    });
    
    favorites.push({
        postId: '44c67b3a-4272-4866-07c2-48d4e48d890d',
        usersId: ['fabefe75-f2c6-44e0-0c6f-6049623491c4',],
    });
    
    favorites.push({
        postId: 'b6208d89-a811-4275-04fc-d2b804d802ad',
        usersId: ['fabefe75-f2c6-44e0-0c6f-6049623491c4',]
    });
}