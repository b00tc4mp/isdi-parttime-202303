import { ModalContainer } from "../library"

export default function ContextualMenu({ options, toggleContextualMenu }) {
    return <ModalContainer className='ContainerContextualMenu absolute top-0 left-0' onClick={event => {
        if(event.target === document.querySelector('.ContainerContextualMenu'))
            toggleContextualMenu()
    }}>
        <section className="w-40 bg-white border border-black rounded-xl flex flex-col items-center absolute top-24 right-8">
            {options.map((option, index) => {
                const isLast = index === options.length - 1

                return <div
                    className={`flex justify-center items-center h-10 w-full ${isLast ? '' : 'border-b border-black'}`}
                    onClick={option.onClick}
                    key={index}
                >
                    <p>{option.text}</p>
                </div>
            })}
        </section>
    </ ModalContainer>
}