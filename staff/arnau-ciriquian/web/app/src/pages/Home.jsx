export default function Home(props) {
    return <div className="home">
    <header className="home__navigation">
        <nav className="home__navigation--profile">
            <img className="avatar" src="images/space-dog.svg" />
            <p className="text"><a className="home__anchor--profile" href="">Profile</a></p>
        </nav>
        <div>
            <a className="navigation__anchor--logout" href=""><img className="anchor__logout--icon" src="images/rocket-launch.svg" /></a>
        </div>
    </header>
    <footer>
        <p className="add-post-anchor"><a className="home__anchor--new-post" href="">Add new post</a></p>
    </footer>
</div>
}