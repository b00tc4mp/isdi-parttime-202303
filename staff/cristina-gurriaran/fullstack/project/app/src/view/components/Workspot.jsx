import './Post.css'

export default function Workspot({ workspot : {
    image, name, location, description, type, features, reviews, likes, author}}){

    return <article className='post-container'>

        <img className='post-image' src={image} />

        <div className='post-data-container'>
            <div className='post-top-container'>
                <div className='post-info-container'>
                    <div className="post-author-container">
                        <img className="post-author-avatar" src={author.avatar} />
                        <h1>{author.name}</h1>
                    </div>
                </div>
            </div>

            <div className='post-bottom-container'>
                <h1>{name}</h1>
                <p>{location.street}, {location.postalCode}, {location.country}
        
                </p>
                <p>{description}</p>
            </div>

        </div>

        
    </article>

}
