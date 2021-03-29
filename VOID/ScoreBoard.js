/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react"
import { useHistory } from "react-router"
// import { useAuthenticatedUser } from '../utils/auth'

import ChatBox from "../components/ChatBox"
import API from "../utils/API";
import io from 'socket.io-client'

import '../styles/palette.css'
import '../styles/ScoreBoard.css'

const ScoreBoard = () => {
    const [code] = useState(window.location.pathname.split('/')[2])
    const [results, setResults] = useState()
    const history = useHistory()

    const socket = useRef()
    useEffect(async () => {
        const {data: [lobby]} = await API.getLobby(code)
        const gameCount = lobby.games.length
        const game = lobby.games[gameCount - 1]
        setResults(game.results)
        
        setupSockets()
    }, [])
    
    const emit = {
        playAgain: _ => socket.current.emit('playAgain', code) //triggers the server
    }

    function setupSockets() {
        socket.current = io.connect('/')
        socket.current.on(`${code}-goToWaitingRoom`, goToWaitingRoom)
    }

    function playAgain(event) { //triggered by the play again button
        event.preventDefault()
        emit.playAgain() //triggers line 20
    }
    
    //line 40 gets triggered with the sockets from the server
    function goToWaitingRoom() {
        history.push(`/waiting-room/${code}`);
    }

    function nth(n) {
        return n + (['st', 'nd', 'rd'][((n + 90) % 100 - 10) % 10 - 1] || 'th')
    }
    
    return (
        <div id="bootstrap-overrides"
            className="score-board-main main container sketchBackground">
            <div className="card-deck">
                <div className="card">
                    <h2 className="card-header">Score Board</h2>
                    <div className="info">
                        <div>
                            <ul className="list-group list-group-flush">
                                {results?.map(({username, score, rank}, i) => (
                                    <li className={'player-score rank-'+rank} key={i}>
                                        <span className='rank'>{nth(rank)}</span>
                                        <span className='username'>{username}</span>
                                        <span className='score'>{score}</span>
                                        <span className='metal'>
                                            {rank === 1 && '🥇'}
                                            {rank === 2 && '🥈'}
                                            {rank === 3 && '🥉'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary btn-lg btn-block"
                            onClick={playAgain}
                        >PLAY AGAIN</button>
                    </div>
                </div>

                <ChatBox />
            </div>
        </div>
    )
}

export default ScoreBoard