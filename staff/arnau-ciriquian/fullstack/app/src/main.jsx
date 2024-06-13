import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
                <App />
        </React.StrictMode>
)

/*      TODO Web/App - objectiu de la app: xarxa social:
        - ig d'acudits

                - MUST
                - loader amb un spinner mentre carrega cada pagina 20230524 2040
                - canviar console.log a console.debug per fer un logger (visualitzar al navegador amb el nivells de console "verbose")
                - editar ReadMe a modo stories de que vol el client 20230510 2118
                - quan es borra un user esborrar tots els seus posts i tots els likes que ha fet a altres posts!
                - react router 20230710 2030 + 20230711 crec
                - app functions de statless a statefull 20230711 2050
                - bcrypt -> amagar password 20230719 2120

                - OPTIONAL
                - session cookies 20230619 2100
                - documentar api -> README 20230607 2100 + SWAGER UI
                - posar un display a lhora de publicar post? per posar o no fotos optativament i al pintar el post un estil {post.image && <img..../>}
                - setTimeOut animacions? algun modal? el dels errors?
                - passar el hide i el delete dins de edit (menys botons a la vista als posts)
                - comentaris en els posts
                - tancar ulls de les contrasenyes amb el canvi de pagina. register i login fet, falta canvi nom, password i mail
                - poder afegir fotos dsd el pc

        TODO Final Project:
                - carpeta project a Feature/Fullstack
                - crear carpetes API, APP, COM i DOC + ReadMe de cada un, el de API, APP i COM per a com funcionen i el de DOC de que va el projecte, objectius, etc 20230629 1940
                - crear un trello o notion per gestionar les feines a fer del projecte 20230629 1950
                - afegir test-coverage (imatge del coverage) al readme de doc, per deixar present lo be que sha testejat, com a minim l'API

        PREGUNTES:
                - 
*/