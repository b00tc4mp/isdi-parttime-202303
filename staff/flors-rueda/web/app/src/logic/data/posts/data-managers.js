import { posts, favorites } from './data'

export const savePosts = () => {
    localStorage.postsJson = JSON.stringify(posts)
}

export const saveFavorites = () => {
    localStorage.favoritesJson = JSON.stringify(favorites)
}
