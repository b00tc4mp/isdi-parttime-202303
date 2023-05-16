import { svg } from "../../../assets/svg-paths";
import { context } from "../../context";
import { retrieveUser } from "../../logic/retrieve-user";
import './ProfileCard.css'

export default function ProfileCard({userId, onSettingsClick}) {
  const userData = retrieveUser(userId);
  const handleSettingsClick = () => {onSettingsClick()}

  console.log('ProfileCard -> render ');
  try {  
    return <article className="user-card">
            <div className="user-card__border">
              {userId === context.userAuth && (<svg onClick={handleSettingsClick} className="user-card__settings" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"> <path d={svg.settings}/></svg>)}
              {/*TODO: add settings*/}
              <img className="user-card__avatar" src={userData.avatar} />
            </div>
            <p className="user-card__name">{userData.name}</p>
            <p className="user-card__username">{userData.username}</p>
          </article>


  } catch (error) {
    console.log(`ProfileCard error: ${error.message}`)
  }
}



/*
"https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar.png"
        */