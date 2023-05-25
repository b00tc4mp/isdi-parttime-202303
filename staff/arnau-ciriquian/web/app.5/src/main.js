import { loginPage } from './pages/login-page'
import { homePage, homePageMain, renderUser } from './pages/home-page'
import showPostFeed from './logic/show-post-feed'
import { context, showHideContainer, showContainer, hideContainer } from './ui'
import { findUserById } from './logic/helpers/data-managers'

if (context.userID === undefined) {
        showContainer(loginPage)
} else {
        if (findUserById(context.userID)) {
                if (showPostFeed()){
                        renderUser()
                        showPostFeed()
                        showContainer(homePage, homePageMain)
                }
        } else {
                showContainer(loginPage)
        }
}

/*  TODO Web/App - objectiu de la app: xarxa social:
        - ig d'acudits
                - canviar alerts per missatges en pantalla?o un toast?
                - tancar ulls de les contrasenyes amb el canvi de pagina. register i login fet, falta canvi nom, password i mail
                - passar for basics a for of?
                - mirar cause pels errors??
                - material symbols google - likes
                - favoritos?
                - canviar nom show-posts a render-posts
                - poder afegir fotos dsd el pc
                
        TODO Arrays:
                - metodes amb callback:
                - seguir amb splice, rersoldre afegir X i  als months

        TODO Curri:
                - Fried Green Tomato (Testarossa), poder fer varis objectes?

        TODO Misc:
                - Repasar Bind
                - acabar video classes

        PREGUNTES:
            - 
*/              