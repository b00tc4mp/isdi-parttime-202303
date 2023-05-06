import Component from "../components/library/composito.js"
import Posts from "../components/posts.js"
import { context } from "../ui.js"
import retrieveUser from "../logic/retrieve-user.js"
import AddPostModal from "../components/add-post-modal.js"


export default class Home extends Component {
    constructor() {
        super(`<div class="home">
        <header class="home-header">

           <div class="home-menu">
                <img class="home-header-avatar" src="" alt="">

                <button class="home-menu-myprofile-button"><a href="" class="myProfile">My Profile</a></button>
            </div>
           
        <h3 class="home-header-logout logout" name="logout"><a href="" class="logout">Logout</a></h3>

        </header>
       
        <main></main>

            <footer class="home-footer">
                <button class="add-post-button">+</button>

            </footer>
            </div>`)

        
        try {
            const user = retrieveUser (context.userId)

            this.container.querySelector('.home-menu').querySelector('img').src= user.avatar

            const profileLink = this.container.querySelector('.home-menu').querySelector('a')
            
            profileLink.innerText = user.name
            profileLink.onclick = event => {
                event.preventDefault()
                throw new Error('TODO go to profile')
            }

        } catch (error){
            throw new Error (message.error)
        }

        

        const _posts = new Posts

        const main = this.container.querySelector('main')
        main.appendChild(_posts.container)


        this.container.querySelector('.home-header-logout').onclick = () =>{
            delete context.userId

            this.onLoggedOut()
        }

        this.container.querySelector('.add-post-button').onclick = () => {
            const addPostModal = new AddPostModal

            main.appendChild(addPostModal.container)

        }

    }

    onLoggedOut() {
        throw new Error ('not overriden')
    }
}
