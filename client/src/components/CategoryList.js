import React, { useRef } from "react"

const CategoryList = ({ categoriesProp }) => {
    const categoryRef = useRef()
    function handleCategoryChange() {

        // console.log(categoryRef.target.value)
        console.log("categoryRef: ", categoryRef.current)
        console.log(categoryRef.current.value)
    }

    return (
        <div className="card-body">
            {/* <h5 className="card-title col">Category</h5> */}
            <select
                // ref = {categoryRef}
                onChange={handleCategoryChange}
                className="btn btn-primary dropDN col flex-grow-1"
                name="categories"
                id="categoriesEl"
                type="button"
                ref={categoryRef}>

                <option value=''>Select Category</option>
                {categoriesProp.map((category) => (
                    <option value={category.category} key={category.id} >{category.category}</option>
                ))}

            </select>
        </div>
    )
}
export default CategoryList