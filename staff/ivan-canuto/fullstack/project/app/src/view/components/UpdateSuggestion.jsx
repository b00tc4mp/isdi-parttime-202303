import { ModalContainer, ModalWindow, Form, Input, Button } from "../library"

export default function UpdateSuggestion({ suggestion, handleCloseModal, handleUpdateSuggestion }) {
    return <ModalContainer className='SuggestionModal absolute top-0 bg-black bg-opacity-20' onClick={(event) => {
        if(event.target === document.querySelector('.SuggestionModal')) {
          handleCloseModal()
          setSuggestion(null)
        }
      }}>
        <ModalWindow>
          <Form className='form-edit bg-white h-96 w-full' onSubmit={handleUpdateSuggestion}>
          <h2 className="text-lg">Edit suggestion</h2>
            {suggestion ?
              <>
                <Input className="w-full" name="title" defaultValue={suggestion.title}></Input>
                <textarea className="border border-gray-400 rounded-md p-2 h-60 w-full" cols="30" rows="10" name="content" defaultValue={suggestion.content}></textarea>
                <div className="w-full flex justify-evenly">
                  <Button className="bg-slate-100 w-14">Update</Button>
                  <Button className='bg-slate-100' type="button" onClick={handleCloseModal}>Cancel</Button>
                </div>
              </>
              :
              <>
                <Input className="w-full" name="title" placeholder="loading..." readOnly></Input>
                <textarea className="border border-gray-400 rounded-md p-2 h-60 w-full" cols="30" rows="10" name="content" placeholder="loading..." readOnly></textarea>
                <div className="w-full flex justify-evenly">
                  <Button className="bg-slate-100 w-14" type='button'>Update</Button>
                  <Button className='bg-slate-100' type="button">Cancel</Button>
                </div>
              </>
            }
          </Form>
        </ModalWindow>
      </ModalContainer>
}