import ChatBox from "../components/ChatBox"
import '../styles/palette.css'
import '../styles/Options.css'


const Options = () => {
    
    return (
        <div className="container ">
            <main className="container ">

                <h2>OPTIONS</h2>
                <div className="card-deck">

{/* OPTIONS CARD */}
                <div className="card">
                    <h2 className="card-header">
                        Customize Your Game
                    </h2>

                    <div className="card-body">
                        <h5 className="card-title">Choose a Category</h5>
                        <select 
                            className="btn btn-secondary" 
                            name="categories" 
                            id="categoriesEl"
                            type="button">
                            <option value="Plants">Plants</option>
                            <option value="Celebrities">Celebrities</option>
                            <option value="Existential Crises">Existential Crises</option>
                        </select>


                    </div>

                    <div className="card-body">
                        <h5 className="card-title">Choose the number of Rounds:</h5>
                        <div>
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter number of Rounds" 
                            aria-label="Recipient's username" 
                            aria-describedby="basic-addon2"
                            // style={{ width: "25%" }}
                            />
                        </div>
                    </div>

                    <div className="container">

                    <div className="card-body ">
                        <h5 className="card-title">Select the number of Players:</h5>
                        <div>
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter number of Players" 
                            aria-label="Recipient's username" 
                            aria-describedby="basic-addon2"

                            />
                        </div>
                    </div>
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">Allow Custom Categories:</h5>

                    </div>

                    <div className="card-body">
                    <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                    </div>
                </div>
{/* END OPTIONS CARD */}
                <div class="card">
                        <div class="card-body">
                        <button type="button" class="btn btn-primary btn-lg btn-block">PLAY AGAIN</button>
                        </div>
                    </div>
                </div>

                <br></br>

                <div>
                    <ChatBox/>
                </div>

            </main>
        </div>
    )
}

export default Options