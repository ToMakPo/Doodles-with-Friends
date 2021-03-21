import { createContext, useState } from "react";

const LobbyContext = createContext('')

const LobbyProvider = ({ children }) => {
    const [lobby, setLobby] = useState('')
    // let lobby
    return (
        <LobbyContext.Provider value={{lobby, setLobby}}>
            {children}
        </LobbyContext.Provider>
    )
}

const LobbyState = {LobbyProvider, LobbyContext}

export default LobbyState