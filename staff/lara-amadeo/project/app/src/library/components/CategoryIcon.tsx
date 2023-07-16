import "./CategoryIcon.css"

type Props = {
    category: string
}

export default function CategoryIcon({ category, ...props }: Props): JSX.Element {

    return <>
        <div className={`category-icon-container 
                ${category == "vegetarian" && "category-vegetarian"}
                ${category == "gluten" && "category-gluten"}
                ${category == "vegan" && "category-vegan"}
                ${category == "alergen" && "category-alergen"}`}{...props}>

            <p className="tiny-text">{`
                ${category === "vegetarian" ? "🥥" : ''}
                ${category === "gluten" ? "🌾" : ''}
                ${category === "vegan" ? "🥑" : ''}
                ${category === "alergen" ? "🥜" : ''}`}</p>
        </div>
    </>
}