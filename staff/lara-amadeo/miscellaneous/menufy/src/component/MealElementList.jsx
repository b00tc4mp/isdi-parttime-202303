export default function MealElementList({ meal, onDelete, view}){

    const handleDeleteElem = () => {
        onDelete(meal.id)
    }

    return <li className='list-elem'>🫒 {meal.text}<span className="material-symbols-rounded icon-s critical-icon" onClick={handleDeleteElem}>{view === 'e' ? 'close' : 'delete'}</span></li>
}