import {userExistById, addUser, authenticateUser, getInitials, changePassword, changeMail, retrieveMail, createPost, getPosts} from '../logic.js'
import {context} from '../main.js'

export default function Home(props) {
    function handlePostClick(event) {
        event.preventDefault()

        props.onPostClick()
    }



return <div className="home contenedor">
<div className="profile-column">
    <h1 className="title">App</h1>
    <div className="profile-image">
        <div className="profile-image-picture">
            <p className="profile-image-picture-name"></p>
        </div>
    </div>
    <div className="nav-buttons">
        <button className="boton boton--primario button-post" onClick={handlePostClick}>Postear</button>
        <button className="boton boton--primario button-profile">Perfil</button>
        <button className="boton boton--primario button-exit">Salir</button>
    </div>
</div>
<div className="saludo">
    <h3 className="centrar-texto">Home</h3>
    <div className="posts-list"></div>
</div>
</div>

}