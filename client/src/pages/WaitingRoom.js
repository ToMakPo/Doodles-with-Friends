import React, { useEffect, useState, useReducer, useRef, useContext } from "react";
import { useWordBankContext } from "../utils/GlobalState"
import ChatBox from "../components/ChatBox"
import '../styles/palette.css'
import '../styles/WaitingRoom.css'
import GameContext from "../utils/GameContext";
import testPeopleAPI from "../utils/testPeopleAPI";
import testCategoriesAPI from "../utils/testCategoriesAPI";
import PlayerList from "../components/PlayerList";
import CategoryList from "../components/CategoryList";


const WaitingRoom = () => {
    // const { lobby } = useContext(GameContext)
    // console.log(lobby)

    
    //Populate Categories function
    const [categories, setCategories] = useState([])
    
    useEffect(()=>{
        testCategoriesAPI.getCategories()
        
            .then( ({data}) => {
                console.log("categories: ", categories)
                console.log("data: ", data)
                data.forEach(element => console.log("Category: ", element.category))
                setCategories(data)
            })
    },[setCategories])
    
    //Functionality for the Add Words using the GlobalState
    const customWordInputRef = useRef()
    const [listOfCustomWords, dispatch] =
    useWordBankContext();
    
    //Functionality to render the PlayerList    
    const [players, setPlayers] = useState([])
    useEffect(() =>{
        testPeopleAPI.getPeople()
        .then( ({data}) => {
            data.forEach(element => console.log(element.name))
            setPlayers(data)
        })

    },[setPlayers])

    function handleSubmit(event) {
        event.preventDefault();
        dispatch({
            type: "newWord",
            name: customWordInputRef.current.value
        });
        customWordInputRef.current.value = "";
    }

    return (
        <div
            id="bootstrap-overrides"
            className="container containerCol sketchBackground">
            <main className="row sketchBackground">
                <div className="card-deck">

                    {/* Column 1 */}
                    <div className="card">
                        <h2 className="card-header">Game Code:  </h2>
                        <div className="card-body">

                            <PlayerList playersProp={players}/>

                        </div>
                    </div>
                    {/* Column 2 */}
                    <div className="card">
                        <h2 className="card-header">Options:</h2>
                        <div style={{padding:"0px 10px"}}>

                            <CategoryList categoriesProp={categories}
                            
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

                                    <div className="" >
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Custom Word"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            ref={customWordInputRef}
                                        />
                                    </div>
                                    <div className="" >

                                        <button className="
                                    col
                                    btn 
                                    btnAdd
                                    btn-block" type="submit">+</button>
                                    </div>

                                </form>


                                <br></br>
                                <div>
                                    {/* <h5 className="card-title">Added Words:</h5> */}
                                    <ul className="list-group">
                                        {listOfCustomWords.map((boop) => (

                                            <li
                                                className=""
                                                key={boop.id}
                                            >
                                                {boop.name}{" "}
                                                <button
                                                    className="btn btnDel"
                                                    onClick={
                                                        () => dispatch({
                                                            type: "deleteWord",
                                                            id: boop.id
                                                        })}
                                                >x
                                            </button>
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
                                />
                            </div>
                        </div>
                    </div>
                    {/* Column 3 */}
                    <ChatBox />
                </div>{/* end card deck div */}
            </main>
            <div className="containerBottom">
                <div className="card-deck">
                    {/* <div className="card"> */}
                    <div className="card-body row">
                        {/* <div className="col"> */}
                        {/* <h5 className="card-title col">Number of Rounds:</h5> */}
                        {/* <input 
                                type="text" 
                                className="form-control col" 
                                placeholder="" 
                                aria-label="Recipient's username" 
                                aria-describedby="basic-addon2"
                                /> */}
                        <button className="
                                col
                                btn btn-primary 
                                btn-lg 
                                btn-block" type="button">Start Game</button>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default WaitingRoom