import { useAppContext } from '../../hooks'

import { Container } from '../library'

import { deleteUserContact } from '../../logic'

import { DEFAULT_AVATAR_URL } from '../../constants'

export default ({ contact: { name, avatar}}) => {
    console.log('Edit List Guest -> render')

    return <>
        <Container tag="article" type="row">
            <img className="home-header-avatar" src={avatar? avatar : DEFAULT_AVATAR_URL} alt=""/>
            <h1 className="name">{name}</h1>
        </Container>
    </>
}