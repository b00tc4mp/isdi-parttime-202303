const MenuButton = ({ onButtonClick, buttonText }) => {

    const handleButtonClick = () => onButtonClick();

    return (
        <button className="bg-transparent w-full hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded" onClick={handleButtonClick}>
            {buttonText}
        </button>
    )
}

export default MenuButton;