import React from "react"

const PlayerList = ({ players }) => {
    return (
        <div>
            <h5 className="card-title">Attending Players:</h5>
            <ol>
                players.map()
                <li key={players.id}>{players.username}</li>
            </ol>
        </div>
    )
}
export default PlayerList