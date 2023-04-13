const users = 'usersJson' in localStorage ? JSON.parse(localStorage.usersJson) : []


if(users.length === 0) {
    users.push({
        id: 'fabefe75-f2c6-44e0-0c6f-6049623491c4',
        username: '@garrus',
        name: 'Garrus Vakarian',
        mail: 'garrus@csec.net', 
        password: 'Garrus123',
        avatar: 'https://static.wikia.nocookie.net/masseffect/images/0/0d/ME3_Garrus_Normandy.png',
        joined: new Date('April 1, 2023 12:15:30'),
    });

    users.push({
        id: '79a8a6ef-305e-4a07-0422-523c3d632d52',
        username: '@liara',
        name: 'Liara Tsoni',
        mail: 'liara@uoe.net',
        password: 'Liara123',
        avatar: 'http://pm1.narvii.com/6360/503163b81e5a20bec77a03f75bca1f444998bc0c_00.jpg',
        joined: new Date('April 1, 2023 17:01:30'),
    });

    users.push({ 
        id: '1e53f274-0d45-467d-1986d-4c3d7a1c5827',
        username: '@grunt',
        name: 'Grunt',
        mail: 'grunt@krogan.net',
        password: 'Grunt123',
        avatar: 'https://static.wikia.nocookie.net/masseffectfanfiction/images/0/07/Grunt_released_from_the_tank.jpg',
        joined: new Date('April 1, 2023 20:15:30'),
    });
}

export default users;