// import axios from "axios";

const testCategoriesAPI = {
    async getCategories(){
        //START TEST DATA
        return{
            data:[
                {
                    category: "plants",

                },
                {
                    category: "Celebrities",

                },
                {
                    category: "Animals",

                },
                {
                    category: "Existential Crises",

                },

            ]
        }
        //END TEST DATA
        // return axios.get("");

    }
}

export default testCategoriesAPI