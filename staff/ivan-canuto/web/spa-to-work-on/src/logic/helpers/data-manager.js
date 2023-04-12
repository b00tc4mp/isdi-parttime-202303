import {users} from '../../data.js'

export const findUserByEmail = (email)=> {
  let user;

  for (let i = 0; i < users.length; i++) {
    
    if (users[i].email === email) {
      user = users[i];
      return user;
    }
  }
}

export const findUserById = (userId)=> {
  let user;

  for (let i = 0; i < users.length; i++) {
    
    if (users[i].id === userId) {
      user = users[i];
      return user;
    }
  }
}
