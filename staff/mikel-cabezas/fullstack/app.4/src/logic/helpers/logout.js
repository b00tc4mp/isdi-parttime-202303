// import { userAccount } from '../../pages/user-account.js'
// import { bodyPage, toggleOffClassInSection, deleteClassOnContainer, addClassOnContainer } from '../../ui.js'
// import { loginPage } from '../../pages/login-page.js'
import { context } from '../../ui.js'

export function logOut() {
    const currentUserEmail = ''
    // addClassOnContainer(userAccount, 'off')
    // deleteClassOnContainer(loginPage, 'off')
    // deleteClassOnContainer(bodyPage, 'logged-in')
    // sessionStorage.clear()
    delete context.userId
    delete sessionStorage.userId
}