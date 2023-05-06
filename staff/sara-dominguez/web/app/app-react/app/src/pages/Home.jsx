export default function Home(){
    console.log('Home->render')


    return <div className="home">
        <header className="home-header">

        <div className="home-menu">
                <img className="home-header-avatar" src="" alt="" />

                <button className="home-menu-myprofile-button"><a href="" className="myProfile">My Profile</a></button>
            </div>
        
        <h3 className="home-header-logout logout" name="logout"><a href="" className="logout">Logout</a></h3>

        </header>
    
        <main></main>

            <footer className="home-footer">
                <button className="add-post-button">+</button>

            </footer>
    </div>
}