import { ModalContainer, ModalWindow, Form, Button } from "../library"

export default function DeleteSuggestion ({ handleCloseModal, handleDeleteSuggestion }) {
    return <ModalContainer className='SuggestionModal fixed top-0 left-0 bg-black bg-opacity-20' onClick={event => {
        if(event.target === document.querySelector('.SuggestionModal'))
        handleCloseModal()
      }}>
        <ModalWindow>
          <Form className='flex flex-col justify-around h-40' onSubmit={handleDeleteSuggestion}>
            <p>Do you want to delete this suggestion?</p>
            <div className='w-full flex justify-evenly'>
              <Button className='bg-slate-100'>Yes</Button>
              <Button className='bg-slate-100' type='button' onClick={handleCloseModal}>No</Button>
            </div>
          </Form>
        </ModalWindow>
      </ModalContainer>
}