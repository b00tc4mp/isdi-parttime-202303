import { useAppContext } from '../../hooks'

import { isCurrentUser, isIncludesCurrentUser, acceptGuestList } from '../../logic'

import { utils } from 'com'

const { extractSubFromToken } = utils

export default ({ list, onModifyList}) => {
    console.log('ListInvited -> render')

    const { alert, freeze, unfreeze } = useAppContext()

    const handleAcceptGuest = () => {
        try {
            freeze()
            acceptGuestList(id)
            unfreeze()

            onModifyList()
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    return <>
        <article className="post-article post-text">
            <div className = "post-menssage">
                <p>{list.name}</p>
                <time>📎 {list.date.toLocaleString()}</time>   
            </div>
            <div className = "post-button">
                <div>
                    <button className = "button-save" onClick={handleAcceptGuest}> '📌'</button>
                </div>

            </div>
        </article>
    </>
}