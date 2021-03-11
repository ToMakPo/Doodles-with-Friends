import '../styles/palette.css'
import '../styles/WaitingRoom.css'

const WaitingRoom = () => {
    return (
        <main>
            <h2>Waiting Room</h2>

            <div className="container">
            <div className="row">
{/* Column 1 */}
                <div className="col-sm ">
                    <div>
                        <div className="card-body">
                            <h4 className="card-title">Your Game Code</h4>
                            <p> 8675309</p>
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">Attending Players</h4>
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
                </div>
{/* Column 2 */}
                <div className="col-sm ">
                    <div>
                        <div className="card-body">
                            <h4 className="card-title">Category:</h4>
                            <p> Animals</p>
                        </div>
                        <div className="card-body">
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter Custom Word" 
                            aria-label="Recipient's username" 
                            aria-describedby="basic-addon2"
                            // style={{ width: "25%"}}
                            />
                            <br></br>
                            <h4 className="card-title">Added Words</h4>
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
{/* Column 3 */}
                <div className="col-sm">
                    <div className="card-body">
                        <button className="btn btn-outline-secondary" type="button">Start Game</button>
                    </div>
                </div>
            </div>
            </div>



        </main>
    )
}

export default WaitingRoom