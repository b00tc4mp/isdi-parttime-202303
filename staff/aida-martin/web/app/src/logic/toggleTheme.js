import { findTheme } from './helpers/dataManagers'
import { saveTheme } from '../data'

export default function toggleTheme () {
  const theme = findTheme()
  let _theme

  if (theme === 'light') {
    _theme = 'dark'
    saveTheme(_theme)
    return _theme
  }

  _theme = 'light'
  saveTheme(_theme)
  return _theme
}
