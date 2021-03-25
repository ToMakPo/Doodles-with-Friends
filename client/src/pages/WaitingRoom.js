import { useEffect, useState, useRef } from "react"
import { useHistory } from "react-router"
import { useAuthenticatedUser } from '../utils/auth'

import ChatBox from "../components/ChatBox"
import PlayerList from "../components/PlayerList";
import API from "../utils/API";
import io from 'socket.io-client'

import '../styles/palette.css'
import '../styles/WaitingRoom.css'
const WaitingRoom = () => {
    const code = window.location.pathname.split('room/')[1]
    const [lobby, setLobby] = useState({});
    const [players, setPlayers] = useState([])
    const [isHost, setIsHost] = useState(false)
    
    const [rotations, setRotations] = useState(3)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')

    const history = useHistory()
    const userId = useAuthenticatedUser()._id

    const socket = useRef()
    const emit = {
        addPlayer: id => socket.current.emit('addPlayer', code, id),
        updateRotations: count => socket.current.emit('updateRotations', code, count),
        updateCategory: category => socket.current.emit('updateCategory', code, category),
        buildGame: _ => socket.current.emit('buildGame', code, rotations, category)
    }

    function changeRules(rules) {
        setRotations(rules.rotations)
        setCategory(rules.category)
    }

    useEffect(() => {
        (async _ => {
            // get lobby
            const {data: [thisLobby]} = await API.getLobby(code)
            setLobby(thisLobby)

            // set up sockets
            setupSockets()

            // get player list
            const playerList = thisLobby.players
            setPlayers(playerList)

            // get user
            // const {data: {_id}} = await API.getPlayer(userId)
            setIsHost(userId === thisLobby.host)
            emit.addPlayer(userId)

            // set rules
            changeRules(thisLobby.rules)
            
            const {data: categoryList} = await API.getCategories()
            setCategories(categoryList)
        })()
    }, [])

    //Functionality for the Add Words using the GlobalState
    // const customWordInputRef = useRef()
    // const [listOfCustomWords, dispatch] = useWordBankContext();

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     const newWord = customWordInputRef.current.value
    //     dispatch({
    //         type: "newWord",
    //         name: newWord
    //     })
    //     customWordInputRef.current.focus()
    //     customWordInputRef.current.value = "";
    // }    

    function hostGame(event) {
        event.preventDefault()

        API.updateLobby(lobby.code, {
            games: [{
                category,
                rotations
            }]
        }).then(data => {
            console.debug(data);
            emit.buildGame()
        })
    }

    ///////////////////
    ///   SOCKETS   ///
    ///////////////////
    function setupSockets() {
        socket.current = io.connect('/')
        socket.current.on(`${code}-setPlayers`, setPlayers)
        socket.current.on(`${code}-setRotations`, setRotations)
        socket.current.on(`${code}-setCategory`, setCategory)
        socket.current.on(`${code}-startGame`, startGame)
    }

    /// these functions should only be called by sockets
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
                        <h2 className="card-header">Game Code:
                        <div className="gameCode">{lobby === undefined ? `no lobby` : lobby.code}</div>
                        </h2>
                        <div className="card-body">
                            <PlayerList players={players} />
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="card">
                        <h2 className="card-header">Options:</h2>
                        <div className="card-body">
                            <div style={{marginBottom: 10}}
                            className="d-flex 
                                flex-row
                                justify-content-center
                                align-items-center">
                                <label 
                                className="mr-2"
                                htmlFor="num-rotations-input">
                                    Number of Rounds: </label>
                                <input
                                    id='num-rotations-input'
                                    type="number"
                                    className="form-control col mx-auto"
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
                            
                            <div style={{marginBottom: 10}}
                            className="d-flex 
                                flex-row
                                justify-content-center
                                align-items-center">
                                <label 
                                className = "col-auto p-0 mr-2" htmlFor="category-selector">
                                    Category:</label>
                                <select 
                                    id="category-selector"
                                    style={{height: 38}}
                                    className=" col-auto btn btn-primary dropDN col flex-grow-1"
                                    type="button"
                                    defaultValue=''
                                    onChange={event => {
                                        const category = event.target.value
                                        emit.updateCategory(category)
                                    }}
                                    disabled={!isHost}
                                    value={category}
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
                        {/* <div className="card-body">
                            <form
                                className="
                                
                                
                                d-flex 
                                flex-row
                                justify-content-between
                                align-items-center
                                    "
                                onSubmit={handleSubmit}>
                                <div className="col p-0">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Custom Word"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        ref={customWordInputRef}
                                    />
                                </div>
                                <div className="col-auto p-0">
                                    <button
                                        className="btn btnAdd btn-block" 
                                        type="submit">
                                        +
                                    </button>
                                </div>
                            </form>
                            <div>
                                <ul className="">
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
                        </div> */}
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