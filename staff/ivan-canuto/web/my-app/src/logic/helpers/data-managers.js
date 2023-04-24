import { users } from "../../data.js";

export const findUserByEmail = (email)=>{
  const usersApp = users()
  for(let i = 0; i < usersApp.length; i++) {
    if(usersApp[i].email === email) return usersApp[i];
  }
  return undefined;
}

export const findUserById = (userId)=>{
  const usersApp = users()
  for(let i = 0; i < usersApp.length; i++) {
    if(usersApp[i].id === userId) return usersApp[i];
  }
  return undefined;
}