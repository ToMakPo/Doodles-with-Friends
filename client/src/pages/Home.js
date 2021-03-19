import '../styles/palette.css'
import '../styles/Home.css'
import API from '../utils/API'
import { useAuthenticatedUser } from '../utils/auth'
import { useContext, useEffect, useRef } from 'react'
import GameContext from '../utils/GameContext'
import { Link } from 'react-router-dom'

const Home = () => {
    const gameCodeRef = useRef()
    const hostGameRef = useRef()
    const AuthUser = useAuthenticatedUser()
    const { setLobby, lobby } = useContext(GameContext)
    const joinLobby = (id) => {
        API.getLobby(id)
            .then(({ data }) => {
                const newLobby = data[0]
                setLobby(newLobby)
                console.log(lobby);
                console.log(newLobby);

            })
    }
    useEffect(() => {
        console.log('useEffect', lobby);
        //  && window.location.assign(`/waiting-room/${lobby.id}`)
        hostGameRef.current.to = `/waiting-room/${lobby.id}`
    }, [lobby])

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
                <div class="card-deck">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">START A NEW GAME</h5>
                            <p class="card-text">YOU'LL BE THE HOST.</p>
                            <Link onClick={hostGame} ref={hostGameRef}>Host Game</Link>
                            {/* <button type="button" onClick={hostGame} class="btn btn-primary btn-lg btn-block"></button> */}
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">JOIN AN EXISTING GAME</h5>
                            <p class="card-text">YOU'RE JOINING A GAME YOUR FRIEND ALREADY STARTED.</p>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" ref={gameCodeRef} placeholder="Game Code" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div class="input-group-append">
                                    <button class="
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