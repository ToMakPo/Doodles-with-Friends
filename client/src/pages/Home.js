import { useRef } from 'react'
import API from '../utils/API'
import { useAuthenticatedUser } from '../utils/auth'
// import { useHistory } from 'react-router'
// import { Link } from 'react-router-dom'

import '../styles/palette.css'
import '../styles/Home.css'

const Home = ({setLobby}) => {
    const gameCodeRef = useRef()
    const AuthUser = useAuthenticatedUser()
    // const history = useHistory()

    function hostGame(event) {
        event.preventDefault()
        API.createLobby(AuthUser)
            .then(({data}) => {
                loadLobby(data.id)
            })
            .catch(err => console.error(err))
    }
    
    function joinLobby(event) {
        event.preventDefault()
        const id = gameCodeRef.current.value.toUpperCase().trim()
        loadLobby(id)
        window.location.assign(`/waiting-room/${gameCodeRef.current.value}`)
    }

    function loadLobby(id) {
        API.getLobby(id)
            .then(({data}) => {
                const lobby = data[0]
                setLobby(lobby)
                window.history.replaceState(null, 'Waiting Room', `/waiting-room/${lobby.id}`);
                // history.push(`/waiting-room/${lobby.id}`);
            })
            .catch(err => console.error(err))
    }

    return (
        <div
            id="bootstrap-overrides"
            className="container sketchBackground">
            <main>
                <div className="card-deck">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">START A NEW GAME</h5>
                            <p className="card-text">YOU'LL BE THE HOST.</p>

                            <button type="button"
                                onClick={hostGame}
                                className="btn btn-primary btn-lg btn-block">Host Game</button>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">JOIN AN EXISTING GAME</h5>
                            <p className="card-text">YOU'RE JOINING A GAME YOUR FRIEND ALREADY STARTED.</p>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" ref={gameCodeRef} placeholder="Game Code" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="
                                btn-primary 
                                btn 
                                btn-block" type="button"
                                        onClick={joinLobby}
                                    >JOIN NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default Home