import { useRef } from 'react'
import { useHistory } from 'react-router'
import { useAuthenticatedUser } from '../utils/auth'
// import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import API from '../utils/API'

import '../styles/palette.css'
import '../styles/Home.css'

const Home = ({ setLobby }) => {
    const AuthUser = useAuthenticatedUser()
    const history = useHistory()
    const gameCodeRef = useRef()

    function hostGame(event) {
        event.preventDefault()
        API.createLobby(AuthUser)
            .then(({ data }) => {
                loadLobby(data.code)
            })
            .catch(err => console.error(err))
    }

    function joinLobby(event) {
        event.preventDefault()
        const code = gameCodeRef.current.value.toUpperCase().trim()
        loadLobby(code)

    }

    function loadLobby(code) {
        API.getLobby(code)
            .then(({ data }) => {
                const lobby = data[0]
                setLobby(lobby)
                if (lobby) {
                    history.push(`/waiting-room/${lobby.code}`);
                }
                else {
                    swal({
                        title: "Invalid Code",
                        text: "Please Enter Valid Game Code",
                        icon: "error",
                    });
                    return
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <div
            id="bootstrap-overrides"
            className="home-main main container sketchBackground">
            <div className="card-deck">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">START A NEW GAME</h5>
                        <sup className="card-text">You will be the host.</sup>

                        <button type="button"
                            onClick={hostGame}
                            className="btn btn-primary btn-lg btn-block">Host Game</button>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">JOIN AN EXISTING GAME</h5>
                        <sup className="card-text">You are joining a game your friend already started</sup>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" ref={gameCodeRef} placeholder="Game Code" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn-primary btn btn-block"
                                    type="button"
                                    onClick={joinLobby}
                                >JOIN GAME</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home