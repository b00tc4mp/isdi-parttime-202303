import useHandleErrors from '../../hooks/useHandleErrors';
import inLogger from '../../inLogger';
import deleteLevel from '../../logic/delete-level';

const CreateLevelToast = ({ handleCloseToast, levelId, setDeleted }) => {
    const handleErrors = useHandleErrors();

    const handleDelete = () => {
        handleErrors(async () => {
            await deleteLevel(levelId);
            setDeleted(true);
            handleCloseToast();
        })
    }

    return (

        <div className="fixed inset-0 flex items-center w-full h-full justify-center z-30">
            <div className="flex bg-light500 rounded-lg shadow p-5">
                <i className="inline-flex items-center justify-center flex-shrink-0 rounded-lg bi bi-trash3-fill text-5xl">
                </i>
                <div className="ml-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-danger100">You sure?</span>
                    <div className="mb-2 text-sm font-normal text-dark400">This action is irreversible.</div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <button onClick={handleDelete} className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-dark300 hover:text-light500 bg-danger300 rounded-lg hover:bg-danger100 focus:ring-4 focus:outline-none focus:ring-danger200 focus:ring-danger300">Yeah, delete</button>
                        </div>
                        <div>
                            <button className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-dark200 bg-light300 border border-light300 rounded-lg hover:bg-light400 focus:ring-4 focus:outline-none focus:ring-light200" onClick={handleCloseToast}>Let's not</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inLogger(CreateLevelToast);