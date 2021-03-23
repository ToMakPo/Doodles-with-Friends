import React, { useRef } from "react"

const CategoryList = ({ categoriesProp, setSelectedCategory, user, host }) => {
    const categoryRef = useRef()
    function handleCategoryChange() {
        setSelectedCategory(categoryRef.current.value)
        // console.log(categoryRef.target.value)
        console.log("categoryRef: ", categoryRef.current)
        console.log()
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
                ref={categoryRef}
                disabled={user !== host}
            >

                <option value=''>Select Category</option>
                {categoriesProp.map((category) => (
                    <option value={category.category} key={category.id} >{category.category}</option>
                ))}

            </select>
        </div>
    )
}
export default CategoryList