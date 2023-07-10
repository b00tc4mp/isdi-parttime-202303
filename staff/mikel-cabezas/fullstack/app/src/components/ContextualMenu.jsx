export default function ContextualModalMenu({ items, onOutterClick, transparent }) {

    const handleCloseModal = () => {
        onOutterClick()
    }
    return <>

        <div className={`overlay contextual-menu--modal z-10 ${transparent && 'bg-transparent'}`} onClick={handleCloseModal}>
        </div>
        <ul className="contextual-menu contextual-menu--container p-2 box-border rounded-md bg-[var(--main-button)] z-20 relative">
            {items.map((item, index) => <li key={index} className={`item contextual-menu--item py-1 ${item.warn && 'warn'}`} onClick={item.onClick}>{item.text}</li>)}
        </ul>
    </>
}