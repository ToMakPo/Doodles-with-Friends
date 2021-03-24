import { useEffect, useState } from "react"
import ChatBox from "../components/ChatBox"
import Timer from "../components/Timer"
import API from "../utils/API"
const { default: Canvas } = require("../components/Canvas")

const ArtistView = () => {
    const [lobby, setLobby] = useState({})
    const [totalRounds, setTotalRounds] = useState()
    useEffect(() => {
        const lobbyCode = window.location.pathname.split('game/')[1]
        API.getLobby(lobbyCode)
            .then(data => {
                setLobby(data.data[0])
                setTotalRounds(data.data[0].games[0].rotations)
            })
            .catch(err => console.error(err))
    }, [])
    console.debug('lobby: ', lobby)
    console.debug(totalRounds);
    return (
        <div
            id="bootstrap-overrides"
            className="active-game-main main container sketchBackground">
            <h2 className="banner">
                <div className="d-flex justify-content-around align-items-center">

                    <div className="d-inline p-2">
                        THE WORD: { }
                    </div>
                    <div className="d-inline p-2 ">
                        ROUND 1 OF {totalRounds}
                    </div>

                    <div className="d-inline p-2 ">
                        TIME REMAINING: <Timer/>
                    </div>
                </div>
            </h2>
            <div className="card-deck" style={{
                display: 'flex',
                alignItems: "stretch",
                // flexDirection: 'row'
                // flexWrap: 'wrap'
            }}>
                <div className="card">
                    <div className="card-body">
                        <div className="">
                            {/* TODO: Check if this is the active player */}
                            <Canvas active={true}/> 
                        </div>
                    </div>
                </div>
                <ChatBox lobby={{code: 'D5EA12C14'}} user={{username: 'ToMakPo'}}/>
            </div>
        </div>
    )
}
export default ArtistView