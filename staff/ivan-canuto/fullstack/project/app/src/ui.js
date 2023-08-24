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
  },
  set conversationId(conversationId) {
    if(!conversationId) {
      delete sessionStorage.conversationId

      return
    }

    sessionStorage.conversationId = conversationId
  },
  get conversationId() {
    return sessionStorage.conversationId
  },
  set suggestionId(suggestionId) {
    if(!suggestionId) {
      delete sessionStorage.suggestionId

      return
    }

    sessionStorage.suggestionId = suggestionId
  },
  get suggestionId() {
    return sessionStorage.suggestionId
  },
  set hideHeader(hideHeader) {
    if(!hideHeader) {
      delete sessionStorage.hideHeader

      return
    }

    sessionStorage.hideHeader = hideHeader
  },
  get hideHeader() {
    return sessionStorage.hideHeader
  },
}