import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
                <App />
        </React.StrictMode>
)

/*  TODO Web/App - objectiu de la app: xarxa social:
        - ig d'acudits
                - CANVI DE BRANCA DE GIT A FULLSTACK 20230524 2100 i 2138
                - posar un display a lhora de publicar post? per posar o no fotos optativament i al pintar el post un estil {post.image && <img..../>}
                - compo container 20230524 1945
                - afegir confirmacio per fer delete dun post (com esta fet amb el user)
                - loader amb un spinner mentre carrega cada pagina 20230524 2040
                - passar el hide i el delete dins de edit (menys botons a la vista als posts)
                - canviar console.log a console.debug per fer un logger (visualitzar al navegador amb el nivells de console "verbose")
                - dark mode 20230509 2005 i 20230515 2040 (guardar valor en session per mantenir el dark en fer refresh)
                - comentaris en els posts
                - editar ReadMe a modo stories de que vol el client 20230510 2118
                - setTimeOut animacions? algun modal? el dels errors?
                - Compra/Venta de posts entre usuaris
                -
                - canviar alerts -> Context i context provider 20230522 2110 (posarli animacio? settimeout?)
                - tancar ulls de les contrasenyes amb el canvi de pagina. register i login fet, falta canvi nom, password i mail
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