import '../styles/palette.css'
import '../styles/Options.css'

const Options = () => {
    return (
        <main>
            <h2>Options</h2>

            <div className="card text-center">
                <div className="card-header">
                    Customize Your Game
                </div>
                <div className="card-body">
                    <h5 className="card-title">Choose a Category</h5>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Categories
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" >Plants</a></li>
                            <li><a className="dropdown-item" >Animals</a></li>
                            <li><a className="dropdown-item" >Celebrities</a></li>
                            <li><a className="dropdown-item" >Existential Crises</a></li>
                            <li><a className="dropdown-item" >Movies</a></li>
                        </ul>
                    </div>
                </div>

                <div className="card-body">
                    <h5 className="card-title">Choose the number of Rounds:</h5>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Rounds:
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" >5</a></li>
                            <li><a className="dropdown-item" >10</a></li>
                            <li><a className="dropdown-item" >15</a></li>
                        </ul>
                    </div>
                </div>

                <div className="card-body">
                    <h5 className="card-title">Select the number of Players:</h5>
                    <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                </div>

                <div className="card-body">
                    <h5 className="card-title">Allow Custom Categories:</h5>
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <label className="btn btn-secondary active">
                        <input type="radio" name="options" id="option1" autocomplete="off" checked/> Yes
                    </label>
                    <label className="btn btn-secondary">
                        <input type="radio" name="options" id="option3" autocomplete="off"/> No
                    </label>
                    </div>
                </div>

            </div>




        </main>
    )
}

export default Options