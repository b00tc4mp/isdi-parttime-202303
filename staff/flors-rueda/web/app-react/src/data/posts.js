const posts = () => 'postsJson' in localStorage ? JSON.parse(localStorage.postsJson) : []

export default posts;