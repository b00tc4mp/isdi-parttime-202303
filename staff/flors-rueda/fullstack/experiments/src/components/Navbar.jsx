import ArrowLeftSvg from '/assets/arrowLeft.svg'

const Navbar = ({ onGoBackClick }) => {

    return (
        <nav className="bg-gray-200 border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" className="flex items-center" onClick={onGoBackClick}>
                    <img src={ArrowLeftSvg} className="h-8 mr-3" alt="Arrow Left" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">Go Back</span>
                </a>
            </div>
        </nav>
    )
}

export default Navbar