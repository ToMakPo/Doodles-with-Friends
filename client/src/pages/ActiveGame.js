import { useEffect, useState } from "react"
import ChatBox from "../components/ChatBox"
import Timer from "../components/Timer"
import API from "../utils/API"
import ReactDOM from "react-dom";
import '../styles/palette.css'
import '../styles/ActiveGame.css'
const { default: Canvas } = require("../components/Canvas")


const ArtistView = () => {
    const [lobby, setLobby] = useState({})
    const [totalRounds, setTotalRounds] = useState()
    useEffect(() => {
        const lobbyCode = window.location.pathname.split('game/')[1]
        API.getLobby(lobbyCode)
            .then(data => {
                setLobby(data.data[0])
                setTotalRounds(data.data[0].games[0].maxRotations)
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

                    <div className="d-inline p-1">
                        THE WORD: 
                        <hr></hr> 
                       <div>
                        <p>{ }test</p> 
                       </div>
                    </div>
                    
                    <div className="d-inline p-1 ">
                        ROUND 1 OF 
                        <hr></hr> 
                        <div>
                        <p>X{totalRounds}</p> 
                        </div>
                    </div>

                    <div className="d-inline p-1 ">
                        TIME REMAINING:
                        <hr></hr> 
                        <Timer />
                    </div>

                </div>
            </h2>
            <div className="card-deck" style={{
                display: 'flex',
                alignItems: "stretch",
                // flexDirection: 'row',
                // flexWrap: 'wrap'
            }}>
                <div className="card canvasCard">
                    <div className="card-body ">
                        <div className="canvasContainer">
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