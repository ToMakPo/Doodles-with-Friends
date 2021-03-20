import React, {useRef, useState} from "react"

const CategoryList = ({categoriesProp}) => {


    return(
    <div className="card-body">
        {/* <h5 className="card-title col">Category</h5> */}
        <select 
            // ref = {categoryRef}
            // onchange={handleCategoryChange}
            className="btn btn-primary dropDN col flex-grow-1" 
            name="categories" 
            id="categoriesEl"
            type="button"> 

            <option disabled selected value>Select Category</option>
            {categoriesProp.map((category) => (
                <option key={Date.now()} value={category.category}>{category.category}</option>
            ))}
            {/* <option value="Plants">Plants</option>
            <option value="Celebrities">Animals</option>
            <option value="Celebrities">Celebrities</option>
            <option value="Existential Crises">Existential Crises</option> */}
        </select>
    </div>
    )
}
export default CategoryList