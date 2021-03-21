// import axios from "axios";

const testPeopleAPI = {
    async getPeople() {
        //START TEST DATA
        return {
            data: [
                {
                    id:1,
                    name: ["Makai Post"],
                },
                {
                    id:2,
                    name: ["Aaron Parnell"],
                },
                {
                    id:3,
                    name: ["Mike Bellevue"],
                },
                {
                    id:4,
                    name: ["Dan Zos'aier"],

                },
                {
                    id:5,
                    name: ["Testy McTesterson"],
                },
            ]
        }
        //END TEST DATA
        // return axios.get("");

    }
}

export default testPeopleAPI