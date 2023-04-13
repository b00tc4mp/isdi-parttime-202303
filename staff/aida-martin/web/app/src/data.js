export const users =
  "usersJson" in localStorage ? JSON.parse(localStorage.usersJson) : [];

// users.push({
//   id: "user-1",
//   name: "Wendy Darling",
//   email: "wendy@darling.com",
//   password: "123123123",
// });

// users.push({
//   id: "user-2",
//   name: "Peter Pan",
//   email: "peter@pan.com",
//   password: "123123123",
// });

// users.push({
//   id: "user-3",
//   name: "Pepito Grillo",
//   email: "pepito@grillo.com",
//   password: "123123123",
// });

// users.push({
//   id: "user-4",
//   name: "Aida",
//   email: "aidamg93@gmail.com",
//   password: "123123123",
// });

export const posts =
  "postsJson" in localStorage ? JSON.parse(localStorage.postsJson) : [];

// posts.push({
//   id: "post-1",
//   author: "user-1",
//   image:
//     "https://byatrip.com/wp-content/uploads/espana-lanzarote-mirador-del-rio.jpg",
//   text: "Hello from Lanzarote!",
//   date: new Date(2023, 0, 23, 12, 32, 0),
// });

// posts.push({
//   id: "post-2",
//   author: "user-2",
//   image:
//     "https://s1.eestatic.com/2022/08/17/mujer/actualidad/696191216_226510665_1706x960.jpg",
//   text: "Around the world!",
//   date: new Date(2023, 1, 14, 16, 23, 0),
// });

// posts.push({
//   id: "post-3",
//   author: "user-4",
//   image:
//     "https://elviajerofeliz.com/wp-content/uploads/2020/01/Escapada-fin-de-semana-en-autocaravana.-%C2%A1Inolvidable.jpg",
//   text: "Yeah!",
//   date: new Date(2023, 3, 10, 11, 56, 0),
// });

export function saveUsers() {
  localStorage.usersJson = JSON.stringify(users);
}

export function savePosts() {
  localStorage.postsJson = JSON.stringify(posts);
}
