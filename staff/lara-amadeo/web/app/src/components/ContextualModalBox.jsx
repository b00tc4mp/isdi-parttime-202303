// import './ContextualModalBox.css'
// import '../../src/style.css'
// export default function ContextualModalBox({ critical, onAnywhereClick, ...options}){

//     const handleOptionClick = (onOption) => {
//         if (typeof onOption === 'function') {
//           onOption();
//         }
//       };

//     return <>
//     <div className="modal-overlay-transparent" onClick={null} />
//     <ul className="contextual-modal-box-container">
//         {Object.keys(options).map((key) => (
//         <li key={key} onClick={() => handleOptionClick(options[key])} className={`small-text-bold option pointer ${critical === 'option 2' && 'critical'}`}>
//           {options[key]}</li>
//       ))}     
//     </ul>
//      </>
// }

import './ContextualModalBox.css'
import '../../src/style.css'
export default function ContextualModalBox({ option1, option2, option3, option4, option5, onOptionOne, onOptionTwo, onOptionThree, onOptionFour, onOptionFive, critical, onAnywhereClick}){

    const handleOptionOne = () => {
        onOptionOne()
    }

    const handleOptionTwo = () => {
        onOptionTwo()
    }

    const handleOptionThree = () => {
        onOptionThree()
    }

    const handleOptionFour = () => {
        onOptionFour()
    }

    const handleOptionFive = () => {
        onOptionFive()
    }

    const handleCloseModal = () => {
        onAnywhereClick()
    }

    return <>
    <div className="modal-overlay-transparent" onClick={handleCloseModal} />
    <ul className="contextual-modal-box-container">
        {option1 && <li onClick={handleOptionOne} className={`small-text-bold option pointer ${critical === 'option 1' && 'critical'}`}>{option1}</li>}
        {option2 && <li onClick={handleOptionTwo} className={`small-text-bold option pointer ${critical === 'option 2' && 'critical'}`}>{option2}</li>}
        {option3 && <li onClick={handleOptionThree} className={`small-text-bold option pointer ${critical === 'option 3' && 'critical'}`}>{option3}</li>}
        {option4 && <li onClick={handleOptionFour} className={`small-text-bold option pointer ${critical === 'option 4' && 'critical'}`}>{option4}</li>}
        {option5 && <li onClick={handleOptionFive} className={`small-text-bold option pointer ${critical === 'option 5' && 'critical'}`}>{option5}</li>}
    </ul>
     </>
}