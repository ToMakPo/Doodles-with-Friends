import React, { useEffect, useState, useReducer, useRef, useContext } from "react";
import { useWordBankContext } from "../utils/GlobalState"
import ChatBox from "../components/ChatBox"
import '../styles/palette.css'
import '../styles/WaitingRoom.css'
import GameContext from "../utils/GameContext";


const WaitingRoom = () => {
    const { lobby } = useContext(GameContext)
    console.log(lobby)
    // const [attendees, setAttendees] = useState({

    // });

    // useEffect(()=>{
    //     const peopleTestArray =["Danny", "Aaron", "Makai", "Mike"]//the below is just to test the setAttendees function
    //     console.log(peopleTestArray)
    //     setAttendees(peopleTestArray)
    // },[])

    //Functionality for the Add Words
    const customWordInputRef = useRef()
    const [listOfCustomWords, dispatch] =
        //Using the Global State:
        useWordBankContext();
    //Using the local State:
    // useReducer ((state,action) =>{
    //     switch(action.type){
    //         case "newWord":
    //             return([...state,{
    //                 name: action.name,
    //                 id:Date.now()
    //             }])
    //         case "deleteWord":
    //             return(state.filter((boop)=>{
    //                 return boop.id !== action.id
    //             }))
    //         default:
    //             return state
    //     }
    // },[])

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
                        <h2 className="card-header">Game Code: {lobby} </h2>
                        <div className="card-body">
                            <h5 className="card-title">Attending Players:</h5>
                            <ol>
                                {/* {attendees.map((boop)=>(
                                    <li>{boop}</li>
                                ))} */}
                                <li>Person1</li>
                                <li>Person2</li>
                                <li>Person3</li>

                            </ol>
                        </div>
                    </div>
                    {/* Column 2 */}
                    <div className="card">
                        <h2 className="card-header">Options:</h2>
                        <div style={{ paddingRight: "10px" }}>
                            <div className="card-body row">
                                <h5 className="card-title col">Category</h5>
                                <select
                                    className="btn btn-primary dropDN col"
                                    name="categories"
                                    id="categoriesEl"
                                    type="button">
                                    <option value="Plants">Plants</option>
                                    <option value="Celebrities">Animals</option>
                                    <option value="Celebrities">Celebrities</option>
                                    <option value="Existential Crises">Existential Crises</option>
                                </select>
                            </div>
                            <hr></hr>
                            <div className="card-body row">
                                <h5 className="card-title col "> Custom Categories:</h5>
                                <div className="row sliderContainer">
                                    <p className="col">NO</p>
                                    <label className="switch col">
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                    <p className="col">YES</p>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="card-body">
                                <form
                                    className="d-flex 
                            justify-content-center 
                            align-items-center"
                                    onSubmit={handleSubmit}
                                >

                                    <div >
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
                                        <button className="
                                    col
                                    btn 
                                    btnAdd
                                    btn-block" type="submit">+</button>
                                    </div>
                                </form>
                                <br></br>
                                <div>
                                    <h5 className="card-title">Added Words:</h5>
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