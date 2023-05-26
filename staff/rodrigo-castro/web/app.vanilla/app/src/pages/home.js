import Component from '../library/composito.js'
import retrievePosts from '../logic/retrieve-posts.js'
import { context } from '../ui.js'
import Posts from '../components/posts.js'
import { findUserById } from '../logic/helpers/data-managers.js'
import AddPostModal from '../components/add-post-modal.js'

export default class Home extends Component {
    constructor() {
        super(`<div class="home-page">
        <header>
            <div name="my-app"><a href="#"><i class="uil uil-scenery"></i><span></span></a></div>
            <nav>
                <ul class="horizontal-menu">
                        <li name="home"><a href="#" class="menu-buttons"><i class="uil uil-home"></i><span class="menu-text">Home</span></a></li>
                        <li name="new-post"><a href="#" class="menu-buttons"><i class="uil uil-camera-plus"></i><span class="menu-text">Post</span></a></li>
                        <li name="my-profile">
                            <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="" class="user-avatar">
                            <a href="#" class="menu-buttons"><span class="menu-text" name="authenticated-user-name">Profile</span></a>
                        </li>
                        <li class="logout" name="logout"><a href="#" class="menu-buttons"><i class="uil uil-signout"></i><span class="menu-text">Logout</span></a></li>
                </ul>
            </nav>
        </header>

        <main class="post-list">
        </main>
    </div>`)

        try{
            const user = findUserById(context.userId)
            
            const profileLink = this.container.querySelector('.user-avatar')

            if(user.avatar)
                profileLink.src = user.avatar

            profileLink.onclick = () => {
                throw new Error('TODO go to profile')
            }
        } catch(error) {
            alert(error.message)
        }

        const posts = new Posts

        const main = this.container.querySelector('main')

        main.appendChild(posts.container)

        this.container.querySelector('.logout').onclick = () => {
            delete context.userId
            
            this.onLoggedOut()
        }

        this.container.querySelector('li[name=new-post]').onclick = () => {
            const addPostModal = new AddPostModal

            addPostModal.cancelPost = () => main.removeChild(addPostModal.container)

            addPostModal.submitPost = () => {
                

                posts.renderPosts()  
            } 
                
            main.appendChild(addPostModal.container)
        }
    }

    onLoggedOut() {
        throw new Error('Not overriden')
    }
}