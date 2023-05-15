export default function Home(props) {
    console.log(props.authenticatedUser)

    return <div className="home-page">
    <header>
        <div name="my-app"><a href="#"><i className="uil uil-scenery"></i><span></span></a></div>
        <nav>
            <ul className="horizontal-menu">
                    <li name="home"><a href="#" className="menu-buttons"><i className="uil uil-home"></i><span className="menu-text">Home</span></a></li>
                    <li name="new-post"><a href="#" className="menu-buttons"><i className="uil uil-camera-plus"></i><span className="menu-text">Post</span></a></li>
                    <li name="my-profile">
                        <img src="https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" alt="" className="user-avatar"/>
                        <a href="#" className="menu-buttons"><span className="menu-text" name="authenticated-user-name">Profile</span></a>
                    </li>
                    <li className="logout" name="logout"><a href="#" className="menu-buttons"><i className="uil uil-signout"></i><span className="menu-text">Logout</span></a></li>
            </ul>
        </nav>
    </header>
    <main className="post-list">
    </main>
</div>
}