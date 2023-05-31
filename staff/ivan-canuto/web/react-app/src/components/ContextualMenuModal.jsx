import './components-styles/ContextualMenuModal.css'
import { v4 as uuidv4 } from 'uuid'

export default function ContextualMenu({ options, toggleContextualMenu }) {

  return <>
  <section className='contextual-menu' onClick={toggleContextualMenu}></section>
  <div className='contextual-menu_subcontainer'>
    <div className="contextual-menu_box">
      {options.map(option => <p key={uuidv4()} className={`contextual-menu_option ${option.text == 'Sold post' && 'text-in-red'}`} onClick={() => {
        toggleContextualMenu()
        option.onClick()
      }}>
        {option.text}
      </p>)}
    </div>
  </div>
  </>
}