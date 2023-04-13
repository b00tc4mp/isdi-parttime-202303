console.log('load main')

import { show } from "./ui.js"
import { loginPage } from './pages/login-page.js'
import { openSession } from "./pages/home-page.js"

if ("userId" in sessionStorage ) {
    openSession(sessionStorage.userId)
}
else {
    show(loginPage)
}
