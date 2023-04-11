import { userAccount } from '../pages/user-account.js'
import { bodyPage, toggleOffClassInSection, deleteClassOnContainer } from '../ui.js'
import { loginPage } from '../pages/login-page.js'

export function logOut() {
    const currentUserEmail = ''
    toggleOffClassInSection(userAccount)
    deleteClassOnContainer(loginPage, 'off')
    deleteClassOnContainer(bodyPage, 'logged-in')
}