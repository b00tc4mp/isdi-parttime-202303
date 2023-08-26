import { useAppContext } from '../../hooks'

import { isCurrentUser, isIncludesCurrentUser, updateBuyPost } from '../../logic'


export default ({ list: { id, owner, name, date}, onEditList, onGotoList }) => {
    console.log('ListGuest -> render')

    const { alert, freeze, unfreeze } = useAppContext()

    const handleEditList = () => onEditList(id)

    const handleGotoList = () => onGotoList(id)

    const isCurrentUserList = isCurrentUser(owner.id)

    return <>
        <article className="post-article post-text">
            <div className = "post-menssage">
                <p>{name}</p>
                <time>📎 {date.toLocaleString()}</time>   
            </div>
            <div className = "post-button">
                <div>
                    {isCurrentUserList ? <button onClick={handleEditList}>🖍</button> : ''} 
                    <button onClick={handleGotoList}>🛒</button> 
                </div>
            </div>
        </article>
    </>
}