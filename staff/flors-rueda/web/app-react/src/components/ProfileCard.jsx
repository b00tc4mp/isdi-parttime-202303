import { retrieveUser } from "../logic/retrieve-user";

export default function ProfileCard({ userId }) {
  console.log('ProfileCard -> render');
  const userData = retrieveUser(userId)

  try {  
    return <section className="home-page__user-profile">
      <h1 className="home-page__user-profile--title">Your profile</h1>
      <article className="user-profile__card">
          <div className="profile-card__data">
              <p className="profile-card__name">Name: {userData.name}<span className="profile-card__name--text"></span></p>
              <p className="profile-card__username">Username: {userData.username}<span className="profile-card__username--text"></span></p>
              <time className="profile-card__since">Since: {userData.joined.toLocaleDateString("en-GB")}<span className="profile-card__since--text"></span></time>
          </div>
          <img className="profile-card__avatar"
              src={userData.avatar} />
      </article>
      <div className="home-page__user-profile--buttons">
          <button className="home-page__user-profile--to-edit-profile">edit profile</button>
          <button className="home-page__user-profile--to-change-password">change password</button>
          <button className="home-page__user-profile--to-favorites">my favorites</button>
          <button className="home-page__user-profile--to-delete-account">delete account</button>
      </div>
    </section>

  } catch (error) {
    alert(`ProfileCard error: ${error.message}`)
  }
}



/*
"https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar.png"
        */