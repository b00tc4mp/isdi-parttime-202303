import { useEffect, useState } from "react"
import { retrieveFavourites } from "../logic/retrieveFavourites"
import { context } from "../ui"


const Favourites = () => {

  const [ postFavourites, setPostFavourites] = useState(null)

  useEffect(() => {
    try {
      retrieveFavourites(context.userId, (error, userFavourites) => {
        if (error) {
          alert(error.message)
        }
  
        setPostFavourites(userFavourites)
      
      })
  
      } catch(error){
        alert(error.message)
      }
    }, [])
  
    return (
      <div>
        {postFavourites && postFavourites.length > 0 && (
          <div>
            <h2>Favourites</h2>
            <div className="profile-posts">
              {postFavourites.map((post) => (
                <img
                  className="profile-post-image"
                  key={post.id}
                  src={post.image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
}

export default Favourites