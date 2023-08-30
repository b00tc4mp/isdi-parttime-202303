import { Container } from '../library'

import { DEFAULT_AVATAR_URL } from '../../constants'

export default ({ message: { text, date, author } }) => {
    console.log('Message -> render')

    return <>
        <Container tag="article" type="row">
            <img className="home-header-avatar" src={author.avatar? avatar : DEFAULT_AVATAR_URL} alt=""/>
            <h1 className="name">{author.name}</h1>
            <p>text</p>
        </Container>
    </>
}