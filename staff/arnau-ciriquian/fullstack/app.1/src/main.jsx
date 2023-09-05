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
                - MUST
                - test a traves de mocha 20230601 2005
                - com folder per exportar validators 20230601 2050
                - compo container 20230524 1945
                - pasar tota la logica de presentacio que requereix dades a la api
                - loader amb un spinner mentre carrega cada pagina 20230524 2040
                - canviar console.log a console.debug per fer un logger (visualitzar al navegador amb el nivells de console "verbose")
                - editar ReadMe a modo stories de que vol el client 20230510 2118
                - Compra/Venta de posts entre usuaris
                - canviar alerts -> Context i context provider 20230522 2110 (posarli animacio? settimeout?)

                - OPTIONAL
                - posar un display a lhora de publicar post? per posar o no fotos optativament i al pintar el post un estil {post.image && <img..../>}
                - setTimeOut animacions? algun modal? el dels errors?
                - passar el hide i el delete dins de edit (menys botons a la vista als posts)
                - comentaris en els posts
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