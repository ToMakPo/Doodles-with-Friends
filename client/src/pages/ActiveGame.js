/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react"
import { useAuthenticatedUser } from '../utils/auth'

import ChatBox from "../components/ChatBox"
import Canvas from "../components/Canvas"
import Timer from "../components/Timer"
import API from "../utils/API"
import io from 'socket.io-client'

import '../styles/palette.css'
import '../styles/ActiveGame.css'

const ArtistView = () => {
    const [code] = useState(window.location.pathname.split('/')[2])
    const [game, setGame] = useState()
    const [round, setRound] = useState()
    const [artist, setArtist] = useState()
    const [isArtist, setIsArtist] = useState(false)
    const [userId] = useState(useAuthenticatedUser()._id);
    const [countDown, setCountDown] = useState(5) //TODO: change the time

    const socket = useRef()
    
    useEffect(() => {
        API.getLobby(code)
            .then(({data: [lobby]}) => {
                setupSockets()

                // get the current game
                const game = lobby.games[lobby.games.length - 1]
                setGame(game)

                // get round
                const round = game.rounds[game.rounds.length - 1]
                setRound(round)

                const isArtist = round.artist === userId
                setIsArtist(isArtist)

                API.getPlayer(round.artist).then(({data: {_id: id, username}}) => {
                    setArtist({id, username})
                })
            })
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        const time = countDown - 1
        console.log(time);
        if (countDown > 0) {
            const timer = setTimeout(() => {
                setCountDown(time)
            }, 1000)
            return () => clearTimeout(timer);
        } else {
            setCountDown(0)
            endRound(null)
        }
    }, [countDown])

    function endRound(winner) {
        socket.current.emit('endRound', code, winner)
    }

    ///////////////////
    ///   SOCKETS   ///
    ///////////////////
    function setupSockets() {
        socket.current = io.connect('/')
        // socket.current.on(`${code}-setPlayers`, setPlayers)
        // socket.current.on(`${code}-setRotations`, setRotations)
        // socket.current.on(`${code}-setCategory`, setCategory)
        // socket.current.on(`${code}-startGame`, startGame)
    }

    return (
        <div
            id="bootstrap-overrides"
            className="active-game-main main container sketchBackground">
                <h2 className="banner">
                    <div className="d-flex justify-content-around align-items-center">
                        {
                            isArtist ? (
                                <div className="d-inline p-1">
                                    Your word is:
                                    <div id='artist-answer'>{round?.answer}</div>
                                </div>
                            ) : (
                                <div className="d-inline p-1">
                                    Artist:
                                    <div id='active-artist'>{artist?.username}</div>
                                </div>
                            )
                        }
                        
                        <div className="d-inline p-1 ">
                            Round {game?.currentRotation + 1} of {game?.rotations}
                        </div>
    
                        <div className="d-inline p-1 ">
                            Remaining Time:
                            <Timer countDown={countDown}/>
                        </div> 
                    </div>
                </h2>
                <div className="card-deck" style={{
                    display: 'flex',
                    justifyContent:"center",
                    alignItems: "stretch",
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width:"100%",
                }}>
                    {/* <div className="card canvasCard"> */}
                        {/* <div className="card-body "> */}
                            <div className="canvasContainer">
                                {/* TODO: Check if this is the active player */}
                                {/* <Canvas active={true}/>  */}
                            </div>
                        {/* </div> */}
                    {/* </div> */}
                    <ChatBox lobby={{code: 'D5EA12C14'}} user={{username: 'ToMakPo'}}/>
                </div>
        </div>
    )
}
export default ArtistView