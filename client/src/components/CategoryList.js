import React from "react"

const CategoryList = ({playersProp}) => {
    return(
    <div className="card-body row">
        <h5 className="card-title col">Category:</h5>
        <select 
            className="btn btn-primary dropDN col" 
            name="categories" 
            id="categoriesEl"
            type="button">
            <option value="Plants">Plants</option>
            <option value="Celebrities">Animals</option>
            <option value="Celebrities">Celebrities</option>
            <option value="Existential Crises">Existential Crises</option>
        </select>
    </div>
    )
}
export default CategoryList