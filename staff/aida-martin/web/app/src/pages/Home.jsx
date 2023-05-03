//import Posts from "../components/posts.js";
import { context } from "../ui.js";
import retrieveUser from "../logic/retrieveUser.js";

export default function Home (props) {
    const DEFAULT_AVATAR_URL =
    "https://cdn-icons-png.flaticon.com/512/219/219989.png";
    const currentUser = retrieveUser(context.userId);

    //const posts = new Posts(DEFAULT_AVATAR_URL);

    return <section className="home">
    <div className="home-header">
      <h1 className="home-title title">HOME</h1>

      <div className="home-header-nav">
        <img className="avatar home-header-avatar" src={currentUser.avatar ? currentUser.avatar
      : DEFAULT_AVATAR_URL} alt="" />
        <a href="" className="profile-link">{currentUser.name}</a>

        <button className="button profile-logout-button">LOG OUT</button>
      </div>
    </div>
    <div className="button-new-post-container">
    <button className="button new-post-button">NEW POST</button>
    </div>

    <main className='posts-container'></main>
  </section>
}