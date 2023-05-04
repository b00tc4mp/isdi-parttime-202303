import { Component } from 'react';
import { userExistById, addUser, authenticateUser, getInitials, changePassword, changeMail, retrieveMail, createPost, getPosts } from '../logic.js'
import { context } from '../main.js'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = { view: 'home', modal: null }
    }


   /* handlePostClick = event => {
        event.preventDefault()
        props.onPostClick()
    } */
    //Posts

    initials(name) {
        console.log('iniciales');
        const result = getInitials(name);
        console.log(result);
        return result;
    }

    render() {
        return <div className="home contenedor">
            <div className="profile-column">
                <h1 className="title">App</h1>
                <div className="profile-image">
                    <div className="profile-image-picture">
                        <p className="profile-image-picture-name">{this.initials(context.userName)}</p>
                    </div>
                </div>
                <div className="nav-buttons">
                    <button className="boton boton--primario button-post">Postear</button>
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
}