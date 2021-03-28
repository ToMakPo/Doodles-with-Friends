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
    const [rounds, setRounds] = useState({})
    const [usernames, setUsernames] = useState([])
    const [userIds, setUserIds] = useState([])
    const history = useHistory()
    // const userId = useAuthenticatedUser()._id.toString()

    const socket = useRef()
    useEffect(() => {
        API.getLobby(code)
            .then(({ data }) => {
                const games = data[0].games.length - 1
                console.log(games)
                setRounds(data[0].games[games].rounds)
                getIDs(data[0].games[0].rounds)
            })
    }, [])

    console.log(userIds)
    const getIDs = (round) => {
        let ids = []
        for (let i = 0; i < round.length; i++) {
            const id = round[i].winner;
            ids.push(id)
            console.log(id)
        }
        console.log(ids)
        setUserIds(ids)
        getUsernames(ids)
    }
    const getUsernames = (ids) => {
        API.getPlayers(ids)
            .then(({ data }) => {
                setUsernames(data)
                console.log('usernames', data)
            })
    }

    console.log(rounds)
    const emit = {
        playAgain: _ => socket.current.emit('playAgain', code) //triggers the server

    }
    useEffect(() => {
        API.getLobby(code)
            .then(({ data: [lobby] }) => {
                setupSockets()
            })
            .catch(err => console.error(err))
    }, [])
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
                    <div>
                        <ul className="list-group list-group-flush">
                            {usernames ? usernames.map(username => (
                                <li key={username.username}>{username.username} {userIds.filter((v) => (v === username._id)).length}</li>
                            )) : 'no winners'}
                        </ul>
                    </div>

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