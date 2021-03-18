import {createContext} from "react";

/**
 * @property {User} user The user profile of the person logged in on this client. Null if not logged in.
 * @property {Lobby} lobby The active lobby that is user is playing. Null if not in lobby.
 */
const GameContext = createContext({
    user: null,
    lobby: null
})

export default GameContext