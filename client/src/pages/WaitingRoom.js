import ChatBox from "../components/ChatBox"
import '../styles/palette.css'
import '../styles/WaitingRoom.css'

const WaitingRoom = () => {
    return (
        <div className="container containerCol">
            <main className="row">
                <h2>Waiting Room</h2>

                <div className="card-deck">

    {/* Column 1 */}
                    <div className="card">
                        <h5 className="card-header">Game Code: 8675309</h5>
                        <div className="card-body">
                            <h5 className="card-title">Attending Players:</h5>
                            <ol>
                                <li>Player 1</li>
                                <li>Player 2</li>
                                <li>Player 3</li>
                                <li>Player 4</li>
                                <li>Player 5</li>
                                <li>Player 6</li>
                            </ol>
                        </div>
                    </div>
    {/* Column 2 */}
                    <div className="card">
                        <h5 className="card-header">Options:</h5>
                        <div style={{paddingRight:"10px"}}>
                            <div className="card-body row">
                                <h5 className="card-title col">Category</h5>
                                <select 
                                    className="btn btn-primary col" 
                                    name="categories" 
                                    id="categoriesEl"
                                    type="button">
                                    <option value="Plants">Plants</option>
                                    <option value="Celebrities">Animals</option>
                                    <option value="Celebrities">Celebrities</option>
                                    <option value="Existential Crises">Existential Crises</option>
                                </select>
                            </div>
                            <div className="card-body row">
                                <h5 className="card-title col "> Custom Categories:</h5>
                                <div className="row sliderContainer">
                                <p className="col">NO</p>
                                <label className="switch col">
                                    <input type="checkbox"/>
                                    <span className="slider round"></span>
                                </label>
                                <p className="col">YES</p>
                                </div>
                            </div>
                            <div className="card-body">
                                <div>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter Custom Word" 
                                    aria-label="Recipient's username" 
                                    aria-describedby="basic-addon2"
                                    />
                                </div>
                                <br></br>
                                <div>
                                    <h5 className="card-title">Added Words:</h5>
                                    <ol>
                                        <li>Word 1</li>
                                        <li>Word 2</li>
                                        <li>Word 3</li>
                                        <li>Word 4</li>
                                        <li>Word 5</li>
                                        <li>Word 6</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
    {/* Column 3 */}
                    <div className="card">
                        <div className="card-body">
                            <ChatBox/>
                        </div>
                    </div>
                </div>{/* end card deck div */}
            </main>
            <div className="containerBottom">
                <div className="card-deck">
                    <div className="card">
                        <div className="card-body row">
                        {/* <div className="col"> */}
                                <h5 className="card-title col">Number of Rounds:</h5>
                                <input 
                                type="text" 
                                className="form-control col" 
                                placeholder="" 
                                aria-label="Recipient's username" 
                                aria-describedby="basic-addon2"
                                />
                            {/* </div> */}
                            {/* <div className="col"> */}
                                <button className="
                                col
                                btn btn-primary 
                                btn-lg 
                                btn-block" type="button">Start Game</button>
                            {/* </div> */}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingRoom