import "./CategoryIcon.css"

export default function CategoryIcon({ category, ...props }) {

    return <>
        <div className={`category-icon-container 
                ${category == "vegetarian" && "category-vegetarian"}
                ${category == "gluten" && "category-gluten"}
                ${category == "vegan" && "category-vegan"}
                ${category == "alergen" && "category-alergen"}`}{...props}>

            <p className="small-text">{`
                ${category === "vegetarian" ? "🥥" : ''}
                ${category === "gluten" ? "🌾" : ''}
                ${category === "vegan" ? "🥑" : ''}
                ${category === "alergen" ? "🥜" : ''}`}</p>
        </div>
    </>
}