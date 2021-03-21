import { createContext, useState } from "react";

/**
 * @property {User} user The user profile of the person logged in on this client. Null if not logged in.
 * @property {Lobby} lobby The active lobby that is user is playing. Null if not in lobby.
 */

export const LobbyContext = createContext('')

const LobbyProvider = ({ children }) => {
    // const [lobby, setLobby] = useState('')
    let lobby
    return (
        <LobbyContext.Provider value={lobby}>
            {children}
        </LobbyContext.Provider>
    )
}


export default LobbyProvider