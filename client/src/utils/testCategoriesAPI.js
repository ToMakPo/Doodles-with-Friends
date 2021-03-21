// import axios from "axios";

const testCategoriesAPI = {
    async getCategories() {
        //START TEST DATA
        return {
            data: [
                {
                    id: 1,
                    category: "plants",

                },
                {
                    id: 2,
                    category: "Celebrities",

                },
                {
                    id: 3,
                    category: "Animals",

                },
                {
                    id: 4,
                    category: "Existential Crises",

                },

            ]
        }
        //END TEST DATA
        // return axios.get("");

    }
}

export default testCategoriesAPI