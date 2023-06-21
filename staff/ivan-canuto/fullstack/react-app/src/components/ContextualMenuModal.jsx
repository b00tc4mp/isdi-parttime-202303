import './components-styles/ContextualMenuModal.css'

export default function ContextualMenu({ options, toggleContextualMenu }) {
  return <>
  <section className="w-full absolute ml-72 mt-8">
    <div className="bg-white flex flex-col w-fit rounded-xl z-50">
      {options.map((option, index) => <p key={index} className={`p-2 flex justify-center border-b-2 last:border-0 hover:bg-gray-200 cursor-pointer first:rounded-t-xl last:rounded-b-xl ${option.text == 'Sold post' && 'text-in-red'}`} onClick={() => {
        toggleContextualMenu()
        option.onClick()
      }}>
        {option.text}
      </p>)}
    </div>
  </section>
  </>
}