import axios from "axios";

class API {
    axios;

    constructor() {
        this.axios = axios.create();
    }

    /**
     * @param {String} name 
     * @param {String} value 
     */
    setHeader(name, value) {

        if (value)
            this.axios.defaults.headers.common[name] = value;
        else
            delete this.axios.defaults.headers.common[name];
    }

    /**
     * @param {object} userData 
     * @param {String} userData.email
     * @param {String} userData.password
     * 
     * @returns {Promise}
     */
    register(userData) {
        return this.axios.post("/api/register", userData);
    }

    /**
     * @param {object} userData 
     * @param {String} userData.email
     * @param {String} userData.password
     * 
     * @returns {Promise}
     */
    login(userData) {
        return this.axios.post("/api/login", userData);
    }

    authenticated() {
        return this.axios.post("/api/authenticated");
    }

    createLobby(host) {
        const id = Math.floor(Math.random() * 36 ** 9).toString(36).padStart(9, '0').toUpperCase()
        return this.axios.post(`/api/lobby`, { id, host: host._id })
    }

    getLobby(id) {
        return this.axios.get(`/api/lobby/${id}`)
    }
    updateLobby(id, body) {
        return this.axios.put(`/api/lobby/${id}`, body);
    }
    //WaitingRoom.js calls the method below. The method below triggers the corresponding back end route in api.js: router.get('/user/:id', (req, res) => {...
    getPlayer(id){
        return this.axios.get(`/api/user/${id}`)
    }
}

export default new API();
