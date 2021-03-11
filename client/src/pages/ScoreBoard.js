import '../styles/palette.css'
import '../styles/ScoreBoard.css'

const ScoreBoard = () => {
    return (
        <div className="container ">
            <main className="container">
            <div 
            className="card" 
            style={{width: "18rem"}}
            >
                <h2 className="card-header">
                    Score Board
                </h2>
                <ol className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                </ol>
            </div>
            </main>

        </div>
    )
}

export default ScoreBoard