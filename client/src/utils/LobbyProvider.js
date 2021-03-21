import { createContext, useState } from "react";

export const LobbyContext = createContext('')

const LobbyProvider = ({ children }) => {
    const [lobby, setLobby] = useState('')
    // let lobby
    return (
        <LobbyContext.Provider value={{lobby, setLobby}}>
            {children}
        </LobbyContext.Provider>
    )
}

export default LobbyProvider