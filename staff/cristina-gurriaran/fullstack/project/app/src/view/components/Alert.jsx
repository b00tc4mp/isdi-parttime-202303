import { AlertIcon } from '../library/Icons'
 
export default function Alert({ message, onAccept }) {
    console.debug('Alert -> render')

    return (
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-gray-dark bg-opacity-60">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto top-1/4">
                <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md bg-gray-200">
                    <div className="flex items-center justify-center w-12 bg-indigo-dark">

                        <a href=""
                            onClick={onAccept}
                        >
                            <AlertIcon />
                        </a>
                    </div>

                    <div className="px-4 py-2 -mx-3">
                        <div className="mx-3">
                            <span className="font-semibold text-indigo-mid ">Something went wrong</span>
                            <p className="text-sm text-gray-600 py-1">
                                {message}
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}


