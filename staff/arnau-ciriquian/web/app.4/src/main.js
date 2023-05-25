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
                - refactor de la home-page - dividir en pagines per a cada funcionalitat? avatar, name, password, email i posts
                - favoritos?
                - refactoritzar fitxers src, potser codi que es pot utilitzar en una altra app deixarlo en la seva pagina sol? rollo el codi dels ulls del password
                
                
        TODO Arrays:
                - metodes amb callback:
                - seguir amb splice, rersoldre afegir X i  als months

        TODO Curri:
                - Fried Green Tomato (Testarossa), poder fer varis objectes?

        PREGUNTES:
            - 
*/              