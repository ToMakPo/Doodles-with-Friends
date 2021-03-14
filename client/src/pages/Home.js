import '../styles/palette.css'
import '../styles/Home.css'

const Home = () => {
    return (
        <div 
        id="bootstrap-overrides" 
        className="container ">
            <main>
                <div class="card-deck">
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">START A NEW GAME</h5>
                        <p class="card-text">YOU'LL BE THE HOST.</p>
                        <button type="button" class="btn btn-primary btn-lg btn-block">START A NEW GAME</button>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">JOIN AN EXISTING GAME</h5>
                        <p class="card-text">YOU'RE JOINING A GAME YOUR FRIEND ALREADY STARTED.</p>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Game Code" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                            <div class="input-group-append">
                                <button class="
                                btn-primary 
                                btn 
                                btn-block" type="button">JOIN NOW</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

export default Home