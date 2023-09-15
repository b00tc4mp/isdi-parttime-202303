import { ModalContainer, ModalWindow, Form, Input, Button } from "../library";

export default function EditSuggestion({
    suggestion,
    handleCloseModal,
    handleEditSuggestion,
    setSuggestion,
}) {
    return (
        <ModalContainer
            className="SuggestionModal fixed top-0 left-0 z-30 bg-black bg-opacity-20"
            onClick={(event) => {
                if (event.target === document.querySelector(".SuggestionModal")) {
                    handleCloseModal();
                    setSuggestion(null);
                }
            }}
        >
            <ModalWindow className="w-11/12">
                <Form className="form-edit h-96 w-full" onSubmit={handleEditSuggestion}>
                    <h2 className="text-lg">Edit suggestion</h2>
                    {suggestion ? (
                        <>
                            <Input
                                className="w-full"
                                name="title"
                                defaultValue={suggestion.title}
                                placeholder='Reason of the suggestion'
                            ></Input>
                            <textarea
                                className="border border-gray-400 rounded-md p-2 h-60 w-full"
                                cols="30"
                                rows="10"
                                name="content"
                                defaultValue={suggestion.content}
                                placeholder='Content of the suggestion'
                            ></textarea>
                            <div className="w-full flex justify-evenly">
                                <Button className="bg-slate-100 w-14">Update</Button>
                                <Button
                                    className="bg-slate-100"
                                    type="button"
                                    onClick={() => {
                                        handleCloseModal();
                                        setSuggestion(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Input
                                className="w-full"
                                name="title"
                                placeholder="loading..."
                                readOnly
                            ></Input>
                            <textarea
                                className="border border-gray-400 rounded-md p-2 h-60 w-full"
                                cols="30"
                                rows="10"
                                name="content"
                                placeholder="loading..."
                                readOnly
                            ></textarea>
                            <div className="w-full flex justify-evenly">
                                <Button className="bg-slate-100 w-14" type="button">
                                    Update
                                </Button>
                                <Button className="bg-slate-100" type="button">
                                    Cancel
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </ModalWindow>
        </ModalContainer>
    );
}
