// import Posts from "../components/posts.js";
import { Component } from 'react'
import { context } from '../ui.js'
import retrieveUser from '../logic/retrieveUser.js'
import { DEFAULT_AVATAR_URL } from '../constans.js'

export default class Home extends Component {
  constructor (props) {
    super(props)

    const { onLogOut } = props
    this.onLogOut = onLogOut
    this.state = { view: 'posts', modal: null }
  }
  // const posts = new Posts(DEFAULT_AVATAR_URL);

  handleLogOut = () => {
    context.removeItem('userId')

    this.onLogOut()
  }

  render () {
    const currentUser = retrieveUser(context.userId)

    return (
      <section className='home'>
        <div className='home-header'>
          <h1 className='home-title title'>HOME</h1>

          <div className='home-header-nav'>
            <img
              className='avatar home-header-avatar' src={currentUser.avatar
                ? currentUser.avatar
                : DEFAULT_AVATAR_URL} alt=''
            />
            <a href='' className='profile-link'>{currentUser.name}</a>

            <button className='button profile-logout-button' onClick={this.handleLogOut}>LOG OUT</button>
          </div>
        </div>
        <div className='button-new-post-container'>
          <button className='button new-post-button'>NEW POST</button>
        </div>

        <main className='posts-container' />
      </section>
    )
  }
}
