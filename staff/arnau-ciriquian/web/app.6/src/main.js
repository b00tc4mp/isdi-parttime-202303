import Component from "./library/composito";
import App from './app'

const app = new App()
const body = new Component(document.body)

body.add(app)

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