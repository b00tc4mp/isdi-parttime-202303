export const setTheme = (_theme) => {

  const root = document.querySelector(':root')

  if(_theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')

  localStorage.theme = _theme
}

export const getTheme = () => {
  return localStorage.theme || 'light'
}

export const context = {
  set postId(postId) {
    if(!postId) {
        delete sessionStorage.postId

        return
    }

    sessionStorage.postId = postId
  },
  get postId() {
    return sessionStorage.postId
  }
}