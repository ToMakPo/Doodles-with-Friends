import React, { useEffect, useState, /*useReducer, */useRef, useContext } from "react";
import { useWordBankContext } from "../utils/GlobalState"
import ChatBox from "../components/ChatBox"
import '../styles/palette.css'
import '../styles/WaitingRoom.css'
import LobbyContext from "../utils/LobbyContext";
import testPeopleAPI from "../utils/testPeopleAPI";
import testCategoriesAPI from '../utils/testCategoriesAPI';
import PlayerList from "../components/PlayerList";
import API from "../utils/API";
import CategoryList from "../components/CategoryList";
import { useAuthenticatedUser } from "../utils/auth";
import { useHistory } from "react-router";

const WaitingRoom = () => {
    const {lobby} = useContext(LobbyContext)
    console.log(lobby)
    const AuthUser = useAuthenticatedUser()
    // const [attendees, setAttendees] = useState({

    // });

    // useEffect(()=>{
    //     const peopleTestArray =["Danny", "Aaron", "Makai", "Mike"]//the below is just to test the setAttendees function
    //     console.log(peopleTestArray)
    //     setAttendees(peopleTestArray)
    // },[])

    //Populate Categories function
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    useEffect(() => {
        testCategoriesAPI.getCategories()

            .then(({ data }) => {
                console.log("data: ", data)
                setCategories(data)
            })
    }, [setCategories])

    //Functionality for the Add Words using the GlobalState
    const customWordInputRef = useRef()
    const [listOfCustomWords, dispatch] =
        useWordBankContext();

    //Functionality to render the PlayerList    
    const [players, setPlayers] = useState([])
    useEffect(() => {
        //OLD DEVELOPMENT CODE START
        // testPeopleAPI.getPeople()
        // .then( ({data}) => {
        //     data.forEach(element => console.log(element.name))
        //     setPlayers(data)
        // })
        //OLD DEVELOPMENT CODE END

        API.getPlayer(AuthUser._id)
            .then(({ data }) => {
                // data.forEach(element => console.log(element.name))
                setPlayers(data)
            })
            .catch(err => console.log(err))

    }, [setPlayers, AuthUser])

    function handleSubmit(event) {
        event.preventDefault();
        dispatch({
            type: "newWord",
            name: customWordInputRef.current.value
        });
        customWordInputRef.current.value = "";
    }

    const printPeople = event => {
        event.preventDefault();

        console.log("Getting people")

        testPeopleAPI.getPeople()
            .then(({ data }) => {

                data.forEach(element => console.log(element.name))
                setPlayers(data)
            })
    }
    // useEffect(() => {
    //     const lobbyId = window.location.pathname.split('room/')[1]
    //     API.getLobby(lobbyId)
    //         .then(data => {
    //             setLobby(data.data[0])
    //         })
    //         .catch(err => console.error(err))
    // }, [])
    const numRoundsRef = useRef()
    const startGame = (id) => {
        id = lobby.id
        const rounds = parseInt(numRoundsRef.current.value)
        API.updateLobby(id, {
            games: [{
                category: selectedCategory,
                maxRotations: rounds
            }]
        })
            .then(data => {
                console.log(data)
                nextPage()
            })
    }

    const history = useHistory()
    const nextPage = () => {
        console.log(lobby)
        history.push(`/active-game/${lobby.id}`);

    }
    console.log(lobby)
    console.log("players: ", players)
    console.log(selectedCategory)
    return (
        <div
            id="bootstrap-overrides"
            className="main container containerCol sketchBackground">
            <div className="row sketchBackground">
                <div className="card-deck">

                    {/* Column 1 */}
                    <div className="card">
                        <h2 className="card-header">Game Code: {lobby === undefined ? `no lobby` : lobby.id}</h2>
                        <div className="card-body">

                            <PlayerList playersProp={players} />

                        </div>
                    </div>
                    {/* Column 2 */}
                    <div className="card">
                        <h2 className="card-header">Options:</h2>
                        <div style={{ padding: "0px 10px" }}>

                            <CategoryList
                                categoriesProp={categories}
                                setSelectedCategory={setSelectedCategory}
                            />
                            <hr></hr>
                            <div className="card-body ">
                                <form
                                    className="d-flex 
                                        flex-grow-1
                                        justify-content-center
                                        row"
                                    onSubmit={handleSubmit}
                                >
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
                                <br></br>
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
                            <hr></hr>
                            <div className="card-body">
                                <input
                                    type="text"
                                    className="form-control col"
                                    placeholder="Number of Rounds"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    ref={numRoundsRef}
                                />
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
                            onClick={event => {
                                event.preventDefault()
                                startGame()
                            }}
                        >Start Game</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingRoom