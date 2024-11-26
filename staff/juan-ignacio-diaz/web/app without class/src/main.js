console.log('load main')

import { show } from "./ui.js"
import { loginPage } from './pages/login-page.js'
import { openSession } from "./pages/home-page.js"

if ("userId" in sessionStorage) {
    if (!openSession(sessionStorage.userId))
        show(loginPage)
}
else {
    show(loginPage)
}
