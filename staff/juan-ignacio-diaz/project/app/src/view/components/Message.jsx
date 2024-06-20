import { Container } from '../library'

import { DEFAULT_AVATAR_URL } from '../../constants'

export default ({ message: { text, date, author } }) => {
    console.log('Message -> render')

    return <>
        <Container tag="article" className="bg-green-50">
            <Container type="row" className="left-0">
                <img className="home-header-avatar" src={author.avatar? author.avatar : DEFAULT_AVATAR_URL} alt=""/>
                <h1 className="name">{author.name}</h1>
            </Container>
            <p className="rounded-lg">{text}</p>
        </Container>
    </>
}