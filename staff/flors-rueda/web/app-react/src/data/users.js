const users = () => 'usersJson' in localStorage ? JSON.parse(localStorage.usersJson) : []

export default users;