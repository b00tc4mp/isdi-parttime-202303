export default function Profile(props) {


    return <div className="modal">
    <div className="home__profile page">
    <h2 className="text profile__user">Update your profile</h2>
    <p className="text"><a className="profile__anchor--avatar" href="">Change avatar</a></p>
    <button className="profile__anchor--username" href="">Change user name</button>
    <button className="profile__anchor--email" href="">Change email</button>
    <button className="profile__anchor--password" href="">Change password</button>
    <button className="profile__anchor--home" href="">Back</button>
</div>
</div>
}