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
    const [players, setPlayers] = useState([])
    const [activePlayer, setActivePlayer] = useState()
    useEffect(() => {
        const lobbyCode = window.location.pathname.split('game/')[1]
        API.getLobby(lobbyCode)
            .then(data => {
                setLobby(data.data[0])
                getUserNames(data.data[0].players)
                setTotalRounds(data.data[0].games[0].rotations)
            })
            .catch(err => console.error(err))
    }, [])

    const getUserNames = (users) => {
        API.getPlayers(users)
            .then(({ data }) => {
                const usernames = []
                for (let i = 0; i < data.length; i++) {
                    const username = data[i].username;
                    console.log(username)
                    usernames.push(username)
                }
                setPlayers(usernames)
                console.log(data)
            })
            .catch(err => console.log(err))
    }
    const selectRandomPlayer = () => {

        const randomPlayer = players.splice(Math.floor(Math.random() * players.length), 1)
        setActivePlayer(randomPlayer)
    }

    console.log('lobby: ', lobby)
    console.log(players);
    console.debug(totalRounds);
    return (
        <div
            id="bootstrap-overrides"
            className="active-game-main main container sketchBackground">
            <h2 className="banner">
                <div className="d-flex justify-content-around align-items-center">

                    <div className="d-inline p-1">
                        DRAW
                        <hr></hr>
                        <div><p>{ }ANYTHING</p></div>
                    </div>

                    <div className="d-inline p-2 ">
                        ROUND 
                        <hr></hr>
                        <div><p>1 OF {totalRounds}</p></div>
                    </div>

                    <div className="d-inline p-2 ">
                        TIME 
                        <hr></hr>
                        <Timer selectRandomPlayer={selectRandomPlayer} />
                    </div>
                    <div>
                        Artist
                        <hr></hr>
                        <div><p>{activePlayer === undefined ? 'No Players' : activePlayer}</p></div>
                        
                        {/* <button type='button' onClick={selectRandomPlayer}>active player</button> */}
                    </div>

                </div>
            </h2>
            <div className="card-deck" style={{
                display: 'flex',
                justifyContent: "center",
                alignItems: "stretch",
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: "100%",
            }}>
                {/* <div className="card canvasCard"> */}
                {/* <div className="card-body "> */}
                <div className="canvasContainer">
                    {/* TODO: Check if this is the active player */}
                    <Canvas active={true} />
                </div>
                {/* </div> */}
                {/* </div> */}
                <ChatBox lobby={{ code: 'D5EA12C14' }} user={{ username: 'ToMakPo' }} />
            </div>
        </div>
    )
}
export default ArtistView