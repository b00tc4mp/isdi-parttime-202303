import { Container } from '../library'

import { DEFAULT_AVATAR_URL } from '../../constants'

export default ({ message: { text, date, author } }) => {
    console.log('Message -> render')

    return <>
        <Container tag="article">
            <Container type="row">
                <img className="home-header-avatar" src={author.avatar? author.avatar : DEFAULT_AVATAR_URL} alt=""/>
                <h1 className="name">{author.name}</h1>
            </Container>
            <p>{text}</p>
        </Container>
    </>
}