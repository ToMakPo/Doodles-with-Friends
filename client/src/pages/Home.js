import '../styles/palette.css'
import '../styles/Home.css'
import API from '../utils/API'
import { useAuthenticatedUser } from '../utils/auth'
import { useContext, useRef } from 'react'
import { LobbyContext } from '../utils/GameContext'

const Home = () => {
    const gameCodeRef = useRef()
    const AuthUser = useAuthenticatedUser()
    const [lobby, setLobby] = useContext(LobbyContext)

    const joinLobby = (id) => {
        API.getLobby(id)
            .then(({ data }) => {
                const newLobby = data[0]
                setLobby(newLobby)
                console.log(lobby)
            })
    }

    const hostGame = () => {
        API.createLobby(AuthUser)
            .then(({ data }) => {
                joinLobby(data.id)
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
                                onClick={() => {
                                    hostGame()
                                    window.location.assign(`/waiting-room/${lobby.id}`)
                                }
                                }
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
                                        onClick={(event) => {
                                            event.preventDefault()
                                            joinLobby(gameCodeRef.current.value.trim().toUpperCase())
                                            window.location.assign(`/waiting-room/${gameCodeRef}`)
                                        }}
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