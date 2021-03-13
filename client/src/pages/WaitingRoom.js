import '../styles/palette.css'
import '../styles/WaitingRoom.css'

const WaitingRoom = () => {
    return (
        <div className="container ">
        <main>
            <h2>Waiting Room</h2>

            <div className="card-deck">

{/* Column 1 */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Game Code:</h3>
                        <h5> 8675309</h5>
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
{/* Column 2 */}
                <div className="card ">
                    <div className="card-header">
                        <h3 className="card-title">Category:</h3>
                        <h5> Animals</h5>
                    </div>
                    <div className="card-body">
                        <div>
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter Custom Word" 
                            aria-label="Recipient's username" 
                            aria-describedby="basic-addon2"
                            // style={{ width: "25%"}}
                            />
                        </div>
                        <br></br>
                        <div>
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
                <div className="card">
                    <div className="card-body">
                        <button className="
                        btn btn-primary 
                        btn-lg 
                        btn-block" type="button">Start Game</button>
                    </div>
                </div>
            {/* </div> */}
            </div>
        </main>
    
        </div>
    )
}

export default WaitingRoom