import { ModalContainer, ModalWindow, Input, Form, Button } from "../library";

export default function CreateSuggestion({ handleCreateSuggestion, handleCloseModal }) {
  return (
    <ModalContainer
      className="SuggestionModal absolute top-0 bg-black bg-opacity-20"
      onClick={(event) => {
        if (event.target === document.querySelector(".SuggestionModal"))
          handleCloseModal();
      }}
    >
      <ModalWindow className='w-11/12'>
        <Form
          className="h-96 w-full"
          onSubmit={handleCreateSuggestion}
        >
          <h2 className="text-lg">New suggestion</h2>
          <Input className="w-full" name="title" autoFocus></Input>
          <textarea
            className="border border-gray-400 rounded-md p-2 h-60 w-full"
            cols="30"
            rows="10"
            name="content"
          ></textarea>
          <div className="w-full flex justify-evenly">
            <Button className="bg-slate-100 w-14">Add</Button>
            <Button
              className="bg-slate-100"
              type="button"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </ModalWindow>
    </ModalContainer>
  );
}
