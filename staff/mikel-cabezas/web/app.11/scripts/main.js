import {loginPage } from './pages/login-page.js'
import { homePage, renderUser } from './pages/home-page.js'
import { context, deleteClassOnContainer, addClassOnContainer, bodyPage } from './ui.js'
import { pushUserDataToHeader } from './logic/push-user-to-header.js'
import { pushUserDataInForm } from './logic/push-user-data-in-form.js'
import { getTheme } from './logic/get-theme.js'
import './template-parts/footer.js'

getTheme()
const user = context.userId

if( !renderUser() ) {
    deleteClassOnContainer(loginPage, ('off'))
    addClassOnContainer(homePage, 'off')
} else if (user) {
    const userId = context.userId
    deleteClassOnContainer(homePage, ('off'))
    addClassOnContainer(loginPage, 'off')
    pushUserDataInForm(userId)
    bodyPage.classList.add('logged-in')
    pushUserDataToHeader(userId)
    // renderUser()
}

