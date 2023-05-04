import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

/*  TODO Web/App - objectiu de la app: xarxa social:
        - ig d'acudits
                - transformar el add post, edit post i els canvis de nom, mail i password a modals (index z=+1) (setState modal)
                - deixar home, posts, profile, login i register com pages (setState view)
                -
                -
                -
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
                - Like Toggle - aplicat amb la funcio al post i a traves de handles fins a home (a traves de posts) per activar un setState per fer re-render? Mala praxis? Alternativa?
                (sense re-render es feia like pero només es veia al fer refresh)

                - handle log out dsd class Home a App (no acepta la funcion fuera del constructor y dsd dentro no se llama en el render, solucion?)
*/              