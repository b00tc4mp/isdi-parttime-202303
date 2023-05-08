import { posts, favorites } from './data.js'

export const savePosts = () => {
    localStorage.postsJson = JSON.stringify(posts)
}

export const saveFavorites = (newFavorites) => {
    if(newFavorites) {
      localStorage.favoritesJson = JSON.stringify(newFavorites) 
    }
    localStorage.favoritesJson = JSON.stringify(favorites)
}
