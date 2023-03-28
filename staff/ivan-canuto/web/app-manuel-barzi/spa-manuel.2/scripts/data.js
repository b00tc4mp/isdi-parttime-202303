var users = []

users.push({
    name: 'Wendy Darling',
    email: 'wendy@darling.com',
    password: '123123123'
})

users.push({
    name: 'Peter Pan',
    email: 'peter@pan.com',
    password: '123123123'
})

users.push({
    name: 'Pepito Grillo',
    email: 'pepito@grillo.com',
    password: '123123123'
})

const findUserByEmail = (email)=> {
  let foundUser;

  for (let i = 0; i < users.length; i++) {
    
    if (users[i].email === email) {
      foundUser = users[i];
      return foundUser;
    }
  }
}
