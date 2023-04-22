import { users } from '../../data.js'

export const findUserByEmail = (email)=> {
  const usersApp = users()
  let user;
  
  for (let i = 0; i < usersApp.length; i++) {
    
    if (usersApp[i].email === email) {
      user = usersApp[i];
      return user;
    }
  }
}

export const findUserById = (userId)=> {
  const usersApp = users()
  let user;

  for (let i = 0; i < usersApp.length; i++) {
    
    if (usersApp[i].id === userId) {
      user = usersApp[i];
      return user;
    }
  }
}
