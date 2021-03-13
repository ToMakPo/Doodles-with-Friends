import ChatBox from "../components/ChatBox"
import '../styles/palette.css'
import '../styles/ScoreBoard.css'


const ScoreBoard = () => {
    return (
        <div className="container ">
            <main className="">

                <h2>FINISHED</h2>
                <div class="card-deck">
                        <div className="card">
                            <h2 className="card-header">
                                Score Board
                            </h2>
                            <ol className="list-group list-group-flush">
                                <li className="list-group-item">An item</li>
                                <li className="list-group-item">A second item</li>
                                <li className="list-group-item">A third item</li>
                            </ol>
                        </div>


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

export default ScoreBoard