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

    const history = useHistory()
    // const userId = useAuthenticatedUser()._id.toString()

    const socket = useRef()
    const emit = {
        playAgain: _ => socket.current.emit('playAgain', code ) //triggers the server

    }
    useEffect(() => {
        API.getLobby(code)
            .then(({data: [lobby]}) => {
                setupSockets()
            })
            .catch(err => console.error(err))
    }, [])
    function setupSockets() {
        socket.current = io.connect('/')
        socket.current.on(`${code}-goToWaitingRoom`, goToWaitingRoom)
    }

    function playAgain(event){ //triggered by the play again button
        event.preventDefault()
        emit.playAgain() //triggers line 20
    } 
//line 40 gets triggered with the sockets from the server
    function goToWaitingRoom() {
        history.push(`/waiting-room/${code}`);
    }




    return (
        <div
            id="bootstrap-overrides"
            className="score-board-main 
            main 
            container 
            sketchBackground">
            <div className="card-deck
            ">
                <div className="card">
                    <h2 className="card-header">
                        Score Board
                    </h2>
                    <ol className="list-group list-group-flush">
                        <li className="list-group-item">An item</li>
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                    </ol>
                    <button 
                    type="button" 
                    className="btn btn-primary btn-lg btn-block"
                    onClick={playAgain}
                    >PLAY AGAIN</button>
                </div>
                {/* <div 
                style={{minWidth:600}}
                > */}

                <ChatBox />
                {/* </div> */}
            </div>
        </div>
    )
}

export default ScoreBoard