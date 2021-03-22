// import axios from "axios";

const testCategoriesAPI = {
    async getCategories() {
        //START TEST DATA
        return {
            data: [
                {
                    id: 1,
                    category: "actions",

                },
                {
                    id: 2,
                    category: "animal",

                },
                {
                    id: 3,
                    category: "body",

                },
                {
                    id: 4,
                    category: "character",

                },
                {
                    id: 5,
                    category: "food",

                },
                {
                    id: 6,
                    category: "nouns",

                },
                {
                    id: 7,
                    category: "object",

                },
                {
                    id: 8,
                    category: "places",

                },

            ]
        }
        //END TEST DATA
        // return axios.get("");

    }
}

export default testCategoriesAPI