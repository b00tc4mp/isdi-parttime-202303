import { useState } from 'react'
import './CategoryInteractive.css'

type Props = {
    category: string
}


export default function CategoryInteractive({ category }: Props) {
    const [displayLabel, setDisplayLabel] = useState(false)

    const toggleOpenCategory = () => {
        setDisplayLabel(!displayLabel)
    }

    return <>
        <div className={`category-interactive-container 
        ${category == "vegetarian" && "category-interactive-vegetarian"}
        ${category == "gluten" && "category-interactive-gluten"}
        ${category == "vegan" && "category-interactive-vegan"}
        ${category == "alergen" && "category-interactive-alergen"}`} onClick={toggleOpenCategory}>

            <div className='category-interactive-icon-container'><p className='body-text-bold'>{`
        ${category === "vegetarian" ? "🥑" : ''}
        ${category === "gluten" ? "🌾" : ''}
        ${category === "vegan" ? "🥥" : ''}
        ${category === "alergen" ? "🥜" : ''}`}</p>
            </div>

            {displayLabel && <p className={`small-text-bold
            ${category == "vegetarian" && "category-interactive-label-vegetarian"}
            ${category == "gluten" && "category-interactive-label-gluten"}
            ${category == "vegan" && "category-interactive-label-vegan"}
            ${category == "alergen" && "category-interactive-label-alergen"}
            `}>{`
        ${category === "vegetarian" ? "Vegetarian" : ''}
        ${category === "gluten" ? "Gluten-free" : ''}
        ${category === "vegan" ? "Vegan" : ''}
        ${category === "alergen" ? "Non-alergens" : ''}`}</p>}
        </div>
    </>
}