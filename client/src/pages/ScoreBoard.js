import ChatBox from "../components/ChatBox"
import '../styles/palette.css'
import '../styles/ScoreBoard.css'


const ScoreBoard = () => {
    return (
        <div
            id="bootstrap-overrides"
            className="container sketchBackground">
            <div className='main'>
                <div className="card-deck">
                    <div className="card">
                        <h2 className="card-header">
                            Score Board
                        </h2>
                        <ol className="list-group list-group-flush">
                            <li className="list-group-item">An item</li>
                            <li className="list-group-item">A second item</li>
                            <li className="list-group-item">A third item</li>
                        </ol>
                        <button type="button" className="btn btn-primary btn-lg btn-block">PLAY AGAIN</button>
                    </div>
                    <ChatBox />
                </div>
            </div>
        </div>
    )
}

export default ScoreBoard