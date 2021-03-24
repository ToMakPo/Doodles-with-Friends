import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import { useWordBankContext } from "../utils/GlobalState"
import { useAuthenticatedUser } from '../utils/auth'

import ChatBox from "../components/ChatBox"
import PlayerList from "../components/PlayerList";
import API from "../utils/API";
import io from 'socket.io-client'

import '../styles/palette.css'
import '../styles/WaitingRoom.css'

const WaitingRoom = () => {
    const [lobby, setLobby] = useState({});
    const [players, setPlayers] = useState([])
    const [player, setPlayer] = useState({})
    const [isHost, setIsHost] = useState(false)

    const [rotations, setRotations] = useState(3)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')

    const history = useHistory()
    const userId = useAuthenticatedUser()._id

    const emit = {
        addPlayer: player => socket.emit('addPlayer', lobby, player),
        updateRotations: count => socket.emit('updateRotations', lobby, count),
        updateCatagory: category => socket.emit('updateCatagory', lobby, category),
        startGame: _ => socket.emit('startGame', lobby)
    }

    useEffect(() => {
        (async _ => {
            // get lobby
            const lobbyCode = window.location.pathname.split('room/')[1]
            const {data: [thisLobby]} = await API.getLobby(lobbyCode)
            setLobby(thisLobby)

            // get player list
            const playerList = thisLobby.players
            setPlayers(playerList)

            // get user
            const {data: user} = await API.getPlayer(userId)
            const player = {
                id: user._id,
                username: user.username
            }
            setIsHost(userId === thisLobby.host)
            setPlayer(player)
            emit.addPlayer(player)
            
            const {data: catagoryList} = await API.getCategories()
            setCategories(catagoryList)
        })()
    }, [])
    
    // const [attendees, setAttendees] = useState([]);

    // useEffect(()=>{
    //     const peopleTestArray =["Danny", "Aaron", "Makai", "Mike"]//the below is just to test the setAttendees function
    //     console.debug(peopleTestArray)
    //     setAttendees(peopleTestArray)
    // },[])

    //Functionality for the Add Words using the GlobalState
    const customWordInputRef = useRef()
    const [listOfCustomWords, dispatch] = useWordBankContext();

    function handleSubmit(event) {
        event.preventDefault();
        dispatch({
            type: "newWord",
            name: customWordInputRef.current.value
        });
        customWordInputRef.current.value = "";
    }

    //console.debug(lobby)
    //console.debug("players: ", players)
    //console.debug(selectedCategory)
    

    function hostGame(event) {
        event.preventDefault()

        API.updateLobby(lobby.code, {
            games: [{
                category: category,
                maxRotations: rotations
            }]
        }).then(data => {
            console.debug(data);
            emit.startGame()
        })
    }

    ///////////////////
    ///   SOCKETS   ///
    ///////////////////
    const socket = useRef()

    useEffect(() => {
        // socket.current = io.connect('/')

        // socket.current.on(`${lobby.code}-addPlayer`, addPlayer)
    })

    /// these functions should only be called by sockets
    function addPlayer(player) {
        setPlayers([...players, player])
    }
    function updateRotations(count) {
        setRotations(count)
    }
    function updateCatagory(category) {
        setCategory(category)
    }
    function startGame() {
        history.push(`/active-game/${lobby.code}`);
    }

    return (
        <div
            id="bootstrap-overrides"
            className="waiting-room-main main container">
            <div className="row containerCol">
                <div className="card-deck">
                    {/* Column 1 */}
                    <div className="card">
                        <h2 className="card-header">Game Code: {lobby === undefined ? `no lobby` : lobby.code}</h2>
                        <div className="card-body">
                            <PlayerList players={players} />
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="card">
                        <h2 className="card-header">Options:</h2>
                        <div className="card-body">
                            <div style={{marginBottom: 5}}>
                                <label htmlFor="num-rotations-input">
                                    Number of Rounds</label>
                                <input
                                    id='num-rotations-input'
                                    type="number"
                                    className="form-control col"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    min={1}
                                    value={rotations}
                                    onChange={event => {
                                        const value = Math.max(event.target.value, 1)
                                        emit.updateRotations(value)
                                    }}
                                    disabled={!isHost}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="category-selector">
                                    Category</label>
                                <select
                                    id="category-selector"
                                    className="btn btn-primary dropDN col flex-grow-1"
                                    type="button"
                                    defaultValue=''
                                    onChange={event => {
                                        const category = event.target.value
                                        emit.updateCatagory(category)
                                    }}
                                    disabled={!isHost}
                                    name="categories">

                                    <option value='any'>Any</option>
                                    <option disabled>------------</option>
                                    {categories.map(category => 
                                        <option
                                            key={category}
                                            value={category}>
                                                {category}
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="card-body">
                            <form
                                className="d-flex 
                                    flex-grow-1
                                    justify-content-center
                                    row"
                                onSubmit={handleSubmit}>
                                <div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Custom Word"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        ref={customWordInputRef}
                                    />
                                </div>
                                <div>
                                    <button
                                        className="col btn btnAdd btn-block" 
                                        type="submit">
                                            +
                                    </button>
                                </div>
                            </form>
                            <div>
                                <ul className="list-group">
                                    {listOfCustomWords.map(word => (
                                        <li className="" key={word.id}>
                                            {word.name + " "}
                                            <button
                                                className="btn btnDel"
                                                onClick={_ => dispatch({
                                                        type: "deleteWord",
                                                        id: word.id
                                                    })}
                                            >x</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <ChatBox />
                </div>{/* end card deck div */}
            </div>
            <div className="containerBottom">
                <div className="card-deck">
                    <div className="card-body row">
                        <button className="
                                col
                                btn btn-primary 
                                btn-lg 
                                btn-block" type="button"
                            onClick={hostGame}
                            disabled={!isHost}
                        >Start Game</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingRoom