import { userAccount } from '../pages/user-account.mjs'
import { bodyPage, toggleOffClassInSection, deleteClassOnContainer } from '../ui.mjs'
import { loginPage } from '../pages/login-page.mjs'

export function logOut() {
    const currentUserEmail = ''
    toggleOffClassInSection(userAccount)
    deleteClassOnContainer(loginPage, 'off')
    deleteClassOnContainer(bodyPage, 'logged-in')
}