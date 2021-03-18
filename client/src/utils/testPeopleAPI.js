// import axios from "axios";

const testPeopleAPI = {
    async getPeople(){
        //START TEST DATA
        return{
            data:[
                {
                    id: 1,
                    name: ["MAKAI POST"],
                },
                {
                    id:2,
                    name: ["AARON PARNEL"],
                },
                {
                    id:3,
                    name: ["MIKE BELLEVUE"],
                },
                {
                    id:3,
                    name: ["DAN ZOS'AIER"],
                },
            ]
        }
        //END TEST DATA
        // return axios.get("");

    }
}

export default testPeopleAPI