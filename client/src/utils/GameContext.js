import {createContext} from "react";

/**
 * @property {User} user The user profile of the person logged in on this client. Null if not logged in.
 * @property {Game} game The active game that is user is playing. Null if not in game.
 */
const GameContext = createContext({
    user: null,
    game: null
})

export default GameContext