import ChatBox from "../components/ChatBox"
import '../styles/palette.css'
import '../styles/Options.css'


const Options = () => {
    
    return (
        <div className="container ">
            <main>

                <h2>GAME OPTIONS</h2>

                <div className="card-deck">
{/* OPTIONS CARD */}
                <div className="card">
                        <h2 className="card-header">
                            Customize Your Game
                        </h2>
                    <div style={{paddingRight:"10px"}}>

                        <div className="card-body row">
                            <h5 className="card-title col">Choose a Category</h5>
                            <select 
                                className="btn btn-secondary col" 
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
                            <h5 className="card-title col">Number of Rounds:</h5>
                            <input 
                            type="text" 
                            className="form-control col" 
                            placeholder="" 
                            aria-label="Recipient's username" 
                            aria-describedby="basic-addon2"
                            />
                        </div>

                        <div className="card-body row">
                            <h5 className="card-title col">Number of Players:</h5>
                                <input 
                                type="text" 
                                className="form-control col" 
                                placeholder="" 
                                aria-label="Recipient's username" 
                                aria-describedby="basic-addon2"
                                />
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
                    </div>
                </div>
{/* END OPTIONS CARD */}
                <div className="card">
                        <div className="card-body">
                        <button 
                        // style={{backgroundColor: "#337ca0" }}
                        type="button" 
                        className="btn btn-primary btn-lg btn-block">LET'S GO</button>
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