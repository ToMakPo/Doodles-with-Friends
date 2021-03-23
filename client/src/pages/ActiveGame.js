import { useEffect, useState } from "react"
import ChatBox from "../components/ChatBox"
import API from "../utils/API"
const { default: Canvas } = require("../components/Canvas")

const ArtistView = () => {
    const [lobby, setLobby] = useState({})
    const [totalRounds, setTotalRounds] = useState()
    useEffect(() => {
        const lobbyId = window.location.pathname.split('game/')[1]
        API.getLobby(lobbyId)
            .then(data => {
                setLobby(data.data[0])
                setTotalRounds(data.data[0].games[0].maxRotations)
            })
            .catch(err => console.error(err))
    }, [])
    console.log('lobby: ', lobby)
    console.log(totalRounds);
    return (
        <div
            id="bootstrap-overrides"
            className="container sketchBackground">
            <main>
                <h2 className="banner">
                    <div className="d-flex justify-content-around align-items-center">

                        <div className="d-inline p-2">
                            THE WORD: { }
                        </div>
                        <div className="d-inline p-2 ">
                            ROUND 1 OF {totalRounds}
                        </div>

                        <div className="d-inline p-2 ">
                            TIME REMAINING
                        </div>
                    </div>
                </h2>
                <div className="card-deck">
                    <div className="card">
                        <div className="card-body">
                            <div className="">
                                <Canvas width={500} height={500} active={true} />
                            </div>
                        </div>
                    </div>
                    <ChatBox />
                </div>

            </main>
        </div>
    )
}
export default ArtistView