const GameOverModal = ({ isGameWon }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute bg-white rounded-lg p-8 shadow-lg">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="p-6 space-y-6">
                        <p className="text-center text-4xl text-gray-900 font-extrabold">
                            {isGameWon ? `Your beach ball found the treasure!` : `Oh, no! Your beach ball died!`}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GameOverModal;