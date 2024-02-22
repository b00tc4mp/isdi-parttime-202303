import Posts from '../components/Posts.jsx'

export default function Home() {
    console.log('Home -> render')

    return <div className="home">
        <header className="home-header">
            <h1 className="title">Home</h1>

            <nav className="home-header-nav">
                <img className="home-header-avatar" src="" alt="" />
                <a href="">Profile</a>
            </nav>

            <button className="home-header-logout">Logout</button>
        </header>

        <main>
            <Posts />
        </main>

        <footer className="home-footer">
            <button className="add-post-button">+</button>
        </footer>
    </div>
}