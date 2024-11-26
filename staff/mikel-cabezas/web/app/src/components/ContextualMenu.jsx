export default function ContextualModalMenu( { items, onOutterClick } ) {

    const handleCloseModal = () => {
        onOutterClick()
    }
    return <>

    <div className ="overlay contextual-menu--modal" onClick={handleCloseModal}>
    </div>
        <ul className="contextual-menu contextual-menu--container">
            {items.map((item, index) => <li key={index} className={`item contextual-menu--item ${item.warn && 'warn'}`} onClick={item.onClick}>{item.text}</li>)}
        </ul>
    </>
}